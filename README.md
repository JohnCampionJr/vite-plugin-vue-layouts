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
  layoutsDir?: string
  exclude: string[]
}
```

### Using configuration

To use custom configuration, pass your options to Pages when instantiating the plugin:

```js
// vite.config.js
import Layouts from 'vite-plugin-vue-layouts';

export default {
  plugins: [
    Layouts({
      layoutsDir: 'src/mylayouts',
    }),
  ],
};
```

### layoutsDir

Relative path to the layouts directory. Supports globs.
All .vue files in this folder are imported async into the generated code.

Any files named `__*__.vue` will be excluded, and you can specify any additional exclusions with the `exclude` option

**Default:** `'src/layouts'`

## Common patterns

`vite-plugin-vue-layouts` transforms the original `router` and replaces every page with its specified layout, and then adds the original page in the `children` property. This conversion brings with it some caveats if you want to implement e.g. transitions on route change. But you also have the full flexibility of the [vue-router API](https://next.router.vuejs.org/api/) at your disposal.

### Transitions
Transitions work as expected and explained in the [vue-router docs](https://next.router.vuejs.org/guide/advanced/transitions.html) only as long as `Component` changes on each route. So if you want a transition between pages with the same layout *and* a different layout, you have to mutate the `:key` attribute on the `<component>` element. (For a detailed example, see the [vue docs](https://v3.vuejs.org/guide/transitions-enterleave.html#transitioning-between-elements))

E.g. `App.vue`
```vue
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide">
      <component :is="Component" :key="route" />
    </transition>
  </router-view>
</template>
```

Now Vue will always trigger a transition if you change the route.

### Exchange data between page and layout
If you want to send data down *from the layout to the page* use props: `<router-view foo="bar" />`

#### Send data up at compile time

If you want to set some state at compile-time, you can add, e.g. `background` to the `meta` property of the router or use the `<route>` block if you work with [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

In `page.vue`:
```vue
<route lang="yaml">
meta:
  layout: default
  background: yellow
</route>
```

Then you have access to `background` in `layout.vue`:
```vue
<script setup>
import { useRouter } from 'vue-router'
</script>
<template>
  <div :style="`background: ${useRouter().currentRoute.value.meta.background};`">
    <router-view />
  </div>
</template>
```
#### Dynamically

If you need to set `background` dynamically at run-time, you can use [custom events](https://v3.vuejs.org/guide/component-custom-events.html#custom-events) and listen for it at the layout.

Emit the event in `page.vue`:
```vue
<script setup>
import { defineEmit } from 'vue'
const emit = defineEmit(['color'])

if (2 + 2 === 4)
  emit('color', 'green')
else
  emit('color', 'red')
</script>
```

Listen for it in `layout.vue`:
```vue
<script setup>
import { ref } from 'vue'

const background = ref('gray')
const setBackground = (color) => {
  background.value = color
}
</script>

<template>
  <main :style="`background: ${background};`">
    <router-view @color="setBackground" />
  </main>
</template>
```
