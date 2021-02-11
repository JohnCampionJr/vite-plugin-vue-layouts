import Debug from 'debug'

export function normalizePath(str: string): string {
  return str.replace(/\\/g, '/')
}

export const debug = Debug('vite-plugin-layouts')

export function pathToName(filepath: string) {
  return filepath.replace(/[_.\-\\/]/g, '_').replace(/[[:\]()]/g, '$')
}
