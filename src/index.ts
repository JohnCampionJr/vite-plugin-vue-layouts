import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { ResolvedOptions, UserOptions } from './types'
import { getFilesFromPath } from './files'
import { debug, normalizePath } from './utils'
import getClientCode from './RouteLayout'
import { getImportCode } from './importCode'

const ID = 'layouts-generated'

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    layoutsDir = 'src/layouts',
    exclude = [],
    importMode = name => name === 'default' ? 'sync' : 'async',
  } = userOptions

  return Object.assign(
    {},
    {
      importMode,
      layoutsDir,
      exclude,
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
