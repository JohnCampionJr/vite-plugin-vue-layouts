declare module 'layouts-generated' {
  import { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[])
  export function createRouterLayout(
    resolve: (layoutName: string) => Promise<Component | { default: Component }>)
}
