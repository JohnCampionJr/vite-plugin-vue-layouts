import type { ResolvedOptions } from './types'

function getClientCode(importCode: string, options: ResolvedOptions) {
  const code = `
${importCode}
export const createGetRoutes = (router, withLayout = false) => {
  const routes = router.getRoutes()
  if (withLayout) {
      return routes
  }
  return () => routes.filter(route => !route.meta.isLayout)
}

export function setupLayouts(routes) {
  function deepSetupLayout(routes, top = true) {
    return routes.map(route => {
      if (route.children?.length > 0) {
        route.children = deepSetupLayout(route.children, false)
      }
      
      if (top) {
        // unplugin-vue-router adds a top-level route to the routing group, which we should skip.
        const skipLayout = !route.component && route.children?.find(r => (r.path === '' || r.path === '/') && r.meta?.isLayout)  

        if (skipLayout) {
          return route
        }

        if (route.meta?.layout !== false) {
          return { 
            path: route.path,
            component: layouts[route.meta?.layout || '${options.defaultLayout}'],
            children: [ {...route, path: ''} ],
            meta: {
              isLayout: true
            }
          }
        }
      }

      if (route.meta?.layout) {
        return { 
          path: route.path,
          component: layouts[route.meta?.layout],
          children: [ {...route, path: ''} ],
          meta: {
            isLayout: true
          }
        }
      }

      return route
    })
  }

    return deepSetupLayout(routes)

}
`
  return code
}

export default getClientCode
