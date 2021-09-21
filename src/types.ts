/**
 * Plugin options.
 */
interface Options {
  /**
   * Relative path to the directory to search for page components.
   * @default 'src/layouts'
   */
  layoutsDir: string
  /**
   * List of path globs to exclude when resolving pages.
   */
  exclude: string[]
  /**
   * Filename of default layout (".vue" is not needed)
   * @default 'default'
   */
  defaultLayout: string
  /**
   * Mode for importing layouts
   */
  importMode: (name: string) => 'sync' | 'async'
}

export type UserOptions = Partial<Options>

export interface ResolvedOptions extends Options {}
