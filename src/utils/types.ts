export interface Config {
  handle?: string | undefined
  accessToken?: string | undefined
}

interface VideoPictures {
  active: boolean
  base_link: string
  default_picture: boolean
  resource_key: string
  type: string
  uri: string
}

interface VideoTag {
  canonical: string
  name: string
  resource_key: string
  tag: string
}

interface VideoFile {
  rendition: string
  link: string
  width: number
  height: number
}

export interface Video {
  width: number
  height: number
  pictures: VideoPictures
  duration: number
  name: string
  created_time: string
  resource_key: string
  manage_link: string
  files: VideoFile[]
  tags: VideoTag[]
}

interface VimeoDataPaging {
  first?: string
  last?: string
  next?: string
  previous?: string
}

export interface VimeoData {
  total: number
  page: number
  per_page: number
  data: Video[]
  paging: VimeoDataPaging
}
