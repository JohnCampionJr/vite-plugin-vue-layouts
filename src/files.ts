import fg from 'fast-glob'
import { ResolvedOptions } from './types'

/**
 * Resolves the files that are valid pages for the given context.
 */
export async function getFilesFromPath(path: string, options: ResolvedOptions): Promise<string[]> {
  const {
    exclude,
  } = options

  const files = await fg('**/*.vue', {
    ignore: ['node_modules', '.git', '**/__*__/*', ...exclude],
    onlyFiles: true,
    cwd: path,
  })

  return files
}
