import {definePlugin} from 'sanity'

import {vimeoBrowsingRendering} from './plugin'
import {vimeoVideoSchema} from './schema'

interface Config {
  handle?: string
  accessToken?: string
}

const defaultConfig: Config = {
  handle: '',
  accessToken: '',
}

/**
 * @public
 */

export const vimeoBrowsing = definePlugin<Config | void>((userConfig) => {
  const config: Config = {...defaultConfig, ...userConfig}
  return {
    name: 'sanity-plugin-vimeo-browsing',
    schema: {
      types: [
        {
          ...vimeoVideoSchema,
          ...vimeoBrowsingRendering(config),
        },
      ],
    },
  }
})
