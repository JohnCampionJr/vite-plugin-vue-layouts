import { VueConstructor } from 'vue'
import * as ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

export default (app: VueConstructor) => {
  app.use(ElementUI)
}
