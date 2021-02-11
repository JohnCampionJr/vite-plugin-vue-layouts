# vite-plugin-vue-layouts

[![npm version](https://img.shields.io/npm/v/vite-plugin-vue-layouts)](https://www.npmjs.com/package/vite-plugin-vue-layouts)

> Router based layout for Vue 3 applications using [Vite](https://github.com/vitejs/vite)

## Getting Started

Install Pages:

```bash
$ npm install -D vite-plugin-vue-layouts
```

Add to your `vite.config.js`:

```js
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-layouts';

export default {
  plugins: [Vue(), Pages(), Layouts()],
};
```

## Overview

This works best along with the [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages).

Layouts are stored in the `/src/layouts` folder by default and are standard Vue components with a `<route-view></route-view>` in the template.



```js
import { createRouter } from 'vue-router'
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  // ...
  routes,
});
```

## Client Types
If you want type definition of `layouts-generated`, add `vite-plugin-vue-layouts/client` to `compilerOptions.types` of your `tsconfig`:
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
