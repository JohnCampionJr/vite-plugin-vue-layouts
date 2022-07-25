import fg from 'fast-glob'
import { ResolvedOptions } from './types'
import { extensionsToGlob, debug } from './utils'

/**
 * Resolves the files that are valid pages for the given context.
 */
export async function getFilesFromPath(path: string, options: ResolvedOptions): Promise<string[]> {
  const {
    exclude,
    extensions,
  } = options

  const ext = extensionsToGlob(extensions)
  debug(extensions)

  const files = await fg(`**/*.${ext}`, {
    ignore: ['node_modules', '.git', '**/__*__/*', ...exclude],
    onlyFiles: true,
    cwd: path,
  })

  return files
}
