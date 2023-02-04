import { ResolvedOptions } from './types'

function getClientCode(importCode: string, options: ResolvedOptions) {
  const code = `
${importCode}

export function setupLayouts(routes) {
  return routes.map(route => {
    const destRoute = { 
      path: route.path,
      component: layouts[route.meta?.layout || '${options.defaultLayout}'],
    }
    if (route.path !== '/') destRoute.children = [ {...route, path: ''} ]
    return destRoute
  })
}
`
  return code
}

export default getClientCode
