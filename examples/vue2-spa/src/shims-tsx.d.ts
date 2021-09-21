/* eslint-disable no-unused-vars */
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare global {
  interface Window {
    Protocol: any
  }
  interface ImportMeta {
    env: Record<string, unknown>
    globEager<T = unknown>(globPath: string): Record<string, T>
  }
}
