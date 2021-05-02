import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './index.css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes })
