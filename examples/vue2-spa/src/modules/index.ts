import { VueConstructor } from 'vue'
import { Store } from 'vuex'
import Router from 'vue-router'
import GlobalComponents from './global-components'
import UsePlugins from './use-plugins'

export interface ModuleProp {
  app: VueConstructor
  store: Store<unknown>
  router: Router
}

export default ({ app, store, router }: ModuleProp) => {
  GlobalComponents(app)
  UsePlugins(app)
}
