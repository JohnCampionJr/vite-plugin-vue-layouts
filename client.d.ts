declare module 'layouts-generated' {
  import { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}

declare module 'virtual:generated-layouts' {
  import { RouteRecordRaw } from 'vue-router'
  import { Component } from 'vue'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
  export function createRouterLayout(
    resolve: (layoutName: string) => Promise<Component | { default: Component }>): Promise<Component | { default: Component }>
}
