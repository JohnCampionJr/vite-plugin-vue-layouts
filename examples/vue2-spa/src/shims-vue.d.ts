declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@vue/runtime-dom' {
  export * from '@vue/runtime-dom/dist/runtime-dom'
  export { defineComponent, PropType } from '@vue/composition-api'
}
