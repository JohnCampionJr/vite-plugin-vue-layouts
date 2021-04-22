// https://github.com/ktsn/vue-router-layout/blob/master/src/index.ts

function getClientCode(importCode: string) {
  const code = `
import {
  h,
  ref,
  computed,
  defineComponent,
  shallowReactive,
  resolveComponent
} from 'vue'
import { useRouter, useRoute } from 'vue-router'

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

export function createRouterLayout(_layouts) {
  return defineComponent(() => {
    const router = useRouter()
    const route = useRoute()

    const name = ref('')
    const layouts = shallowReactive(_layouts)
    const layout = computed(() => layouts[name.value])
  
    async function updateLayout(_name) {
      if (typeof layouts[_name] === 'function')
        layouts[_name] = await resolveLayout(layouts[_name])
      name.value = _name || 'default'
    }

    router.beforeEach(async (to, from, next) => {
      await updateLayout(to.meta?.layout)
      next()
    })

    updateLayout(route.meta?.layout)

    return () => {
      if (!layout.value || typeof layout.value === 'function')
        return h(resolveComponent('router-view'))

      return h(layout.value, {
        key: layout.name,
      })
    }
  })
}
`
  return code
}

export default getClientCode
