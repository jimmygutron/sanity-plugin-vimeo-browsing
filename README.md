# sanity-plugin-vimeo-browsing

## Introduction
>You can browse your vimeo video files and use in Sanity Studio.

## Installation

```sh
npm install sanity-plugin-vimeo-browsing
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {myPlugin} from 'sanity-plugin-vimeo-browsing'

export default defineConfig({
  //...
  plugins: [vimeoBrowsing({
    handle: SANITY_STUDIO_VIMEO_HANDLE,
    accessToken: SANITY_STUDIO_VIMEO_ACCESS_TOKEN
  })],
})
```

## License

[MIT](LICENSE) © Jinkyu Song

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
