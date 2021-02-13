// https://github.com/ktsn/vue-router-layout/blob/master/src/index.ts

function getClientCode(importCode: string) {
  const code = `
import {
  h,
  defineComponent,
  shallowReactive,
  resolveComponent
} from 'vue'

${importCode}

export function setupLayouts(routes) {
  return [
    {
      path: '/',
      component: createRouterLayout(layouts),
      children: routes,
    },
  ]
}

async function resolveLayout(layout) {
  if (typeof layout === 'function') {
    return (await layout())?.default
  }
  return layout
} 

export function createRouterLayout(
  layouts,
) {
  return defineComponent({
    name: 'RouterLayout',

    async beforeRouteEnter(to, _from, next) {
      const name = to.meta?.layout || 'default'
      const layoutComp = await resolveLayout(layouts[name])

      next((vm) => {
        vm.layoutName = name
        vm.layouts[name] = layoutComp
      })
    },

    async beforeRouteUpdate(to, _from, next) {
      try {
        const name = to.meta?.layout || 'default'
        if (typeof this.layouts[name] === 'function')
          this.layouts[name] = await resolveLayout(this.layouts[name])
        this.layoutName = name
        next()
      }
      catch (error) {
        next(error)
      }
    },

    data() {
      return {
        layoutName: 'default',
        layouts: shallowReactive(layouts),
      }
    },

    render() {
      const layout = this.layoutName && this.layouts[this.layoutName]
      if (!layout)
        return h(resolveComponent("router-view"))

      return h(layout, {
        key: this.layoutName,
      })
    },
  })
}
`
  return code
}

export default getClientCode
