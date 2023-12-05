import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createGetRoutes, setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import './index.css'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getRoutes = createGetRoutes(router)
console.log(getRoutes())
const app = createApp(App)

app.use(router)

app.mount('#app')
