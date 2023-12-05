import { ResolvedOptions } from './types'

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
  return routes.map(route => {
    const isBoolean = typeof route.meta?.layout === 'boolean'
    if(isBoolean && !route.meta?.layout) {
      return route
    } else {
      let componentName = !isBoolean && route.meta?.layout ? route.meta?.layout : '${options.defaultLayout}'
      return {
        path: route.path,
        component: layouts[componentName],
        children: route.path === '/' ? [route] : [{...route, path: ''}],
        meta: {
          isLayout: true
        }
      }
    }
  })
}
`
  return code
}

export default getClientCode
