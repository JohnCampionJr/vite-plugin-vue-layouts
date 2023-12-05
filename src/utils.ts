import Debug from 'debug'
import fg from 'fast-glob'
import { resolve } from 'path'

export function extensionsToGlob(extensions: string[]) {
  return extensions.length > 1 ? `{${extensions.join(',')}}` : extensions[0] || ''
}

export function normalizePath(str: string): string {
  return str.replace(/\\/g, '/')
}

export const debug = Debug('vite-plugin-layouts')

export function pathToName(filepath: string) {
  return filepath.replace(/[_.\-\\/]/g, '_').replace(/[[:\]()]/g, '$')
}

export function resolveDirs(dirs: string | string[] | null, root: string) {
  if (dirs === null) return []
  const dirsArray = Array.isArray(dirs) ? dirs : [dirs]
  const dirsResolved: string[] = []

  for (const dir of dirsArray) {
    if (dir.includes('**')) {
      const matches = fg.sync(dir, { onlyDirectories: true })
      for (const match of matches)
        dirsResolved.push(normalizePath(resolve(root, match)))
    }
    else {
      dirsResolved.push(normalizePath(resolve(root, dir)))
    }
  }

  return dirsResolved

}