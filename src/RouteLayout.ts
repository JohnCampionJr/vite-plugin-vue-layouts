// https://github.com/ktsn/vue-router-layout/blob/master/src/index.ts

function getClientCode(importCode: string) {
  const code = `
${importCode}

export function setupLayouts(routes) {
  return routes.map((x) => {
    return { 
      path: x.path,
      component: createLayout(x.meta?.layout),
      children: [x],
    }
  })
}

export function createLayout(pageDefinedLayout) {
  const layout = pageDefinedLayout || 'default'
  return layouts[layout]
}
`
  return code
}

export default getClientCode
