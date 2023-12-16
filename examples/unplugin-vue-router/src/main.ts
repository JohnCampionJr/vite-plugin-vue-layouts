import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createGetRoutes, setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: routes => setupLayouts(routes),
})

const getRoutes = createGetRoutes(router)
console.log(getRoutes())

const app = createApp(App)

app.use(router)

app.mount('#app')
