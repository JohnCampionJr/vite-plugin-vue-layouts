import Vue from 'vue'
import VueRouter from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
Vue.use(VueRouter)

const routes = setupLayouts(generatedRoutes)

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
