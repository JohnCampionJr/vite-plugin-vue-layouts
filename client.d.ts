/**
 * @deprecated
 */
declare module 'layouts-generated' {
  import { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}

declare module 'virtual:generated-layouts' {
  import { Component } from 'vue'
  import { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
  export function createRouterLayout(
    resolve: (layoutName: string) => Promise<Component | { default: Component }>
  ): Component
}
