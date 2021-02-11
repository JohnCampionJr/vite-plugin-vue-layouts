import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { ResolvedOptions, UserOptions } from './types'
import { getFilesFromPath } from './files'
import { debug, normalizePath } from './utils'
import getClientCode from './RouteLayout'

const ID = 'layouts-generated'

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    layoutsDir = 'src/layouts',
    exclude = [],
  } = userOptions

  const root = process.cwd()

  return Object.assign(
    {},
    {
      root,
      layoutsDir,
      exclude,
    },
    userOptions,
  )
}

function layoutPlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined
  const filesPath: string[] = []
  const pagesDirPaths: string[] = []

  const options: ResolvedOptions = resolveOptions(userOptions)

  return {
    name: 'vite-plugin-layouts',
    enforce: 'pre',
    configResolved(_config) {
      config = _config
      options.root = config.root
    },
    resolveId(id) {
      if (id === ID)
        return ID
    },
    async load(id) {
      if (id === ID) {
        debug('Loading...')
        const layoutsDirPath = normalizePath(resolve(options.root, options.layoutsDir))
        debug('Loading Layout Dir: %O', layoutsDirPath)

        const files = await getFilesFromPath(layoutsDirPath, options)

        debug('Layout Files: %O', files)

        const imports: string[] = []

        for (const file of files) {
          const path = `/${options.layoutsDir}/${file}`
          imports.push(`'${path}': () => import('${path}'),`)
        }
        debug('Layout Imports: %O', imports)

        const importsCode = `const layouts = {
${imports.join('\n')}
}`

        debug('Layout Async Code: %O', importsCode)

        const clientCode = getClientCode(importsCode, options.layoutsDir)

        debug('Client code: %O', clientCode)

        return clientCode
      }
    },
  }
}

export * from './types'
export default layoutPlugin
