/**
 * @deprecated
 */
declare module 'layouts-generated' {
  import type { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}

declare module 'virtual:generated-layouts' {
  import type { Router, RouteRecordRaw } from 'vue-router'
  // need any here due to different types for vue-router versions
  export function createGetRoutes(router: Router | any, withLayout?: boolean): () => RouteRecordRaw[]
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}
