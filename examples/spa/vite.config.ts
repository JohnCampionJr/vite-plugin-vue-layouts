import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'unplugin-vue-markdown/vite'

const config = defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
      syncIndex: false,
    }),
    Layouts({
      defaultLayout: 'default',
      layoutsDirs: 'src/**/layouts',
      pagesDirs: [],
    }),
    Markdown({}),
  ],
})

export default config
