# vite-plugin-vue-layouts

[![npm version](https://img.shields.io/npm/v/vite-plugin-vue-layouts)](https://www.npmjs.com/package/vite-plugin-vue-layouts)

> Router based layout for Vue 3 applications using [Vite](https://github.com/vitejs/vite)

## Overview

This works best along with the [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages).

Layouts are stored in the `/src/layouts` folder by default and are standard Vue components with a `<router-view></router-view>` in the template.

Pages without a layout specified use `default.vue` for their layout.

You can use route blocks to allow each page to determine its layout.  The block below in a page will look for `/src/layouts/users.vue` for its layout.

See the [Vitesse starter template](https://github.com/antfu/vitesse) for a working example.

```html
<route lang="yaml">
meta:
  layout: users
</route>
```


## Getting Started

Install Layouts:

```bash
$ npm install -D vite-plugin-vue-layouts
```

Add to your `vite.config.js`:

```js
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

export default {
  plugins: [Vue(), Pages(), Layouts()],
};
```

In main.ts, you need to add a few lines to import the generated code and setup the layouts.

```js
import { createRouter } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  // ...
  routes,
});
```

## Client Types
If you want type definition of `virtual:generated-layouts`, add `vite-plugin-vue-layouts/client` to `compilerOptions.types` of your `tsconfig`:
```json
{
  "compilerOptions": {
    "types": ["vite-plugin-vue-layouts/client"]
  }
}
```

## Configuration

```ts
interface UserOptions {
  layoutsDirs?: string | string[]
  exclude: string[]
  defaultLayout?: string
}
```

### Using configuration

To use custom configuration, pass your options to Layouts when instantiating the plugin:

```js
// vite.config.js
import Layouts from 'vite-plugin-vue-layouts';

export default {
  plugins: [
    Layouts({
      layoutsDirs: 'src/mylayouts',
      defaultLayout: 'myDefault'
    }),
  ],
};
```

### layoutsDirs

Relative path to the layouts directory. Supports globs.
All .vue files in this folder are imported async into the generated code.

Can also be an array of layout dirs

Any files named `__*__.vue` will be excluded, and you can specify any additional exclusions with the `exclude` option

**Default:** `'src/layouts'`

## How it works

`setupLayouts` transforms the original `router` by

1. Replacing every page with its specified layout
2. Appending the original page in the `children` property.

Simply put, layouts are [nested routes](https://next.router.vuejs.org/guide/essentials/nested-routes.html#nested-routes) with the same path.

Before:
```
router: [ page1, page2, page3 ]
```

After `setupLayouts()`:
```
router: [
  layoutA: page1,
  layoutB: page2,
  layoutA: page3,
]
```

That means you have the full flexibility of the [vue-router API](https://next.router.vuejs.org/api/) at your disposal.

## Common patterns

### Transitions
Layouts and Transitions work as expected and explained in the [vue-router docs](https://next.router.vuejs.org/guide/advanced/transitions.html) only as long as `Component` changes on each route. So if you want a transition between pages with the same layout *and* a different layout, you have to mutate `:key` on `<component>` (for a detailed example, see the vue docs about [transitions between elements](https://v3.vuejs.org/guide/transitions-enterleave.html#transitioning-between-elements)).

`App.vue`
```html
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide">
      <component :is="Component" :key="route" />
    </transition>
  </router-view>
</template>
```

Now Vue will always trigger a transition if you change the route.

### Data from layout to page

If you want to send data *down* from the layout to the page, use props
```
<router-view foo="bar" />
```

### Set static data at the page

If you want to set state in your page and do something with it in your layout, add additional properties to a route's `meta` property. Doing so only works if you know the state at build-time.

You can use the `<route>` block if you work with [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages).

In `page.vue`:
```html
<template><div>Content</div></template>
<route lang="yaml">
meta:
  layout: default
  bgColor: yellow
</route>
```

Now you can read `bgColor` in `layout.vue`:
```html
<script setup>
import { useRouter } from 'vue-router'
</script>
<template>
  <div :style="`background: ${useRouter().currentRoute.value.meta.bgColor};`">
    <router-view />
  </div>
</template>
```

### Data dynamically from page to layout

If you need to set `bgColor` dynamically at run-time, you can use [custom events](https://v3.vuejs.org/guide/component-custom-events.html#custom-events).

Emit the event in `page.vue`:
```html
<script setup>
import { defineEmit } from 'vue'
const emit = defineEmit(['color'])

if (2 + 2 === 4)
  emit('setColor', 'green')
else
  emit('setColor', 'red')
</script>
```

Listen for `setColor` custom-event in `layout.vue`:
```html
<script setup>
import { ref } from 'vue'

const bgColor = ref('yellow')
const setBg = (color) => {
  bgColor.value = color
}
</script>

<template>
  <main :style="`background: ${bgColor};`">
    <router-view @set-color="setBg" />
  </main>
</template>
```
