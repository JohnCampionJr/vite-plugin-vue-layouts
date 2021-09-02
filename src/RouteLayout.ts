function getClientCode(importCode: string) {
  const code = `
${importCode}

export function setupLayouts(routes) {
  return routes.map(route => {
    return { 
      path: route.path,
      component: layouts[route.meta?.layout || 'default'],
      children: [ {...route, path: ''} ],
    }
  })
}
`
  return code
}

export default getClientCode
