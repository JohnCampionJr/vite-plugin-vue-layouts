// https://github.com/ktsn/vue-router-layout/blob/master/src/index.ts

function getClientCode(importCode: string, layoutDir: string) {
  const code = `
import {
  h,
  defineComponent,
  shallowReactive,
} from 'vue'

${importCode}

export function setupLayouts(routes) {
  const RouterLayout = createRouterLayout((layout) => {
    return Promise.resolve(layouts[\`/${layoutDir}/\${layout}.vue\`]())
  })

  return [
    {
      path: '/',
      component: RouterLayout,
      children: routes,
    },
  ]
}

export function createRouterLayout(
  resolve,
) {
  return defineComponent({
    name: 'RouterLayout',

    async beforeRouteEnter(to, _from, next) {
      const name = to.meta.layout || 'default'
      const layoutComp = name
        ? (await resolve(name)).default
        : undefined

      next((vm) => {
        vm.layoutName = name
        if (name && layoutComp)
          vm.layouts[name] = layoutComp
      })
    },

    async beforeRouteUpdate(to, _from, next) {
      try {
        const name = to.meta.layout || 'default'
        if (name && !this.layouts[name])
          this.layouts[name] = (await resolve(name)).default

        this.layoutName = name
        next()
      }
      catch (error) {
        next(error)
      }
    },

    data() {
      return {
        layoutName: undefined,
        layouts: shallowReactive(
          Object.create(null),
        ),
      }
    },

    render() {
      const layout = this.layoutName && this.layouts[this.layoutName]
      if (!layout)
        return h('span')

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
