import { ResolvedOptions } from './types'

function getClientCode(importCode: string, options: ResolvedOptions) {
  const code = `
${importCode}

export function setupLayouts(routes) {
  return routes.map(route => {
    return { 
      path: route.path,
      meta: route.meta,
      component: layouts[route.meta?.layout || '${options.defaultLayout}'],
      children: route.path === '/' ? [route] : [{...route, path: ''}]
    }
  })
}
`
  return code
}

export default getClientCode
