import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { ResolvedOptions, UserOptions } from './types'
import { getFilesFromPath } from './files'
import { debug, normalizePath } from './utils'
import getClientCode from './RouteLayout'
import { getImportCode } from './importCode'

const ID = 'layouts-generated'

export function defaultImportMode(name: string) {
  if (process.env.VITE_SSG)
    return 'sync'
  return name === 'default' ? 'sync' : 'async'
}

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return Object.assign(
    {
      layoutsDir: 'src/layouts',
      exclude: [],
      importMode: defaultImportMode,
    },
    userOptions,
  )
}

function layoutPlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig

  const options: ResolvedOptions = resolveOptions(userOptions)

  return {
    name: 'vite-plugin-layouts',
    enforce: 'pre',
    configResolved(_config) {
      config = _config
    },
    resolveId(id) {
      if (id === ID)
        return ID
    },
    async load(id) {
      if (id === ID) {
        const layoutsDirPath = normalizePath(resolve(config.root, options.layoutsDir))
        debug('Loading Layout Dir: %O', layoutsDirPath)

        const files = await getFilesFromPath(layoutsDirPath, options)

        const importCode = getImportCode(files, options)

        const clientCode = getClientCode(importCode)

        debug('Client code: %O', clientCode)

        return clientCode
      }
    },
  }
}

export * from './types'
export default layoutPlugin
