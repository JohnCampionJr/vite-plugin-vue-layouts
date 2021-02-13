import { dirname, join, parse } from 'path'
import { ResolvedOptions } from './types'

export function getImportCode(files: string[], options: ResolvedOptions) {
  const imports: string[] = []
  const head: string[] = []
  let id = 0

  for (const file of files) {
    const path = `/${options.layoutsDir}/${file}`
    const name = join(dirname(file), parse(file).name)
    if (options.importMode(name) === 'sync') {
      const variable = `__layout_${id}`
      head.push(`import ${variable} from '${path}'`)
      imports.push(`'${name}': ${variable},`)
      id += 1
    }
    else {
      imports.push(`'${name}': () => import('${path}'),`)
    }
  }

  const importsCode = `
${head.join('\n')}
export const layouts = {
${imports.join('\n')}
}`
  return importsCode
}
