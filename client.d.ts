import type { RouteRecordRaw } from 'vue-router'

/**
 * @deprecated
 */
declare module 'layouts-generated' {
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}

declare module 'virtual:generated-layouts' {
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}
