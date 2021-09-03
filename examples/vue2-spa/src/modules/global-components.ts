import { VueConstructor } from 'vue'

interface FileModule {
  default: VueConstructor
}

export default (Vue: VueConstructor) => {
  // Auto import src/componenst/Global/**/*.vue
  const componentsContext = import.meta.globEager('../components/Global/**/*.vue')
  Object.keys(componentsContext).forEach((key: string) => {
    const componentConfig = componentsContext[key] as FileModule
    const comp = componentConfig.default
    Vue.component(comp.name, comp)
  })
}
