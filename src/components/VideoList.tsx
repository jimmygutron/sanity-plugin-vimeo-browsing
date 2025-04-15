import {ArrowLeftIcon, ArrowRightIcon, SearchIcon} from '@sanity/icons'
import {Box, Button, Dialog, Flex, Grid, Spinner, TextInput} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useState} from 'react'
import type {FormPatch, PatchEvent} from 'sanity'
import {useDebouncedCallback} from 'use-debounce'

import {Config, Video, VimeoData} from '../utils/types'
import VideoCard from './VideoCard'

interface Props {
  config: Config
  onClose: () => void
  onChange: (patch: FormPatch | FormPatch[] | PatchEvent) => void
  value: object | undefined
}

const VideoList = ({config, value, onClose, onChange}: Props) => {
  const [videos, setVideos] = useState<Video[]>([])
  const [vimeoData, setVimeoData] = useState<VimeoData>()

  const [isOpening, setIsOpening] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const handle = config.handle
  const accessToken = config.accessToken

  const vimeoUrl = useMemo(() => {
    return 'https://api.vimeo.com'
  }, [])

  const apiUrl = useMemo(() => {
    return `/users/${handle}/videos?per_page=16`
  }, [])

  const getPage = useCallback((url: string | undefined) => {
    return url?.replace(`${apiUrl}&page=`, '')
  }, [])

  const fetchVimeoData = useDebouncedCallback(async (page: string | undefined, query: string) => {
    setIsFetching(true)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    try {
      const response = await fetch(
        `${vimeoUrl}${apiUrl}${page && `&page=${page}`}&query=${query}`,
        options,
      )
      const data = await response.json()
      if (data) {
        setVimeoData(data)
        setVideos(data.data)
        setIsFetching(false)
        setIsOpening(false)
        //console.log(data)
      }
    } catch (error) {
      setIsOpening(false)
      setIsFetching(false)
      console.error(error)
    }
  }, 300)

  useEffect(() => {
    fetchVimeoData('1', '')
  }, [])

  return (
    <Dialog
      width={2}
      animate
      header="Select Video"
      id="dialog-example"
      onClose={onClose}
      onClickOutside={onClose}
      zOffset={1000}
    >
      {isOpening ? (
        <Flex align={'center'} justify={'center'} padding={4}>
          <Box padding={4}>
            <Spinner muted />
          </Box>
        </Flex>
      ) : (
        <Flex align={'center'} justify={'center'} direction={'column'} padding={4} gap={4}>
          <TextInput
            icon={<SearchIcon />}
            onChange={(e) => {
              fetchVimeoData('1', e.currentTarget.value)
            }}
            fontSize={1}
            placeholder={'Type to search videos...'}
          />
          <Grid width={'100%'} columns={4} gap={3} style={{position: 'relative'}}>
            {videos.length > 0
              ? videos.map((item: Video) => {
                  return (
                    <VideoCard
                      value={value}
                      onChange={onChange}
                      onClose={onClose}
                      key={item.resource_key}
                      item={item}
                    />
                  )
                })
              : null}
            <Flex
              justify={'center'}
              align={'center'}
              style={{
                position: 'absolute',
                width: '101%',
                height: '101%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 300ms cubic-bezier(0, 0.6, 0, 0.8)',
                opacity: `${isFetching ? 1 : 0}`,
                visibility: `${isFetching ? 'visible' : 'hidden'}`,
                pointerEvents: `${isFetching ? 'auto' : 'none'}`,
              }}
            >
              <Spinner muted />
            </Flex>
          </Grid>
          {videos.length > 0 && (
            <Flex gap={3}>
              <Button
                onClick={() => {
                  fetchVimeoData(getPage(vimeoData?.paging.previous), '')
                }}
                disabled={!vimeoData?.paging.previous}
                muted={!vimeoData?.paging.previous}
                mode={'ghost'}
                text={'Prev'}
                icon={<ArrowLeftIcon />}
              />
              <Button
                onClick={() => {
                  fetchVimeoData(getPage(vimeoData?.paging.next), '')
                }}
                disabled={!vimeoData?.paging.next}
                muted={!vimeoData?.paging.next}
                mode={'ghost'}
                text={'Next'}
                iconRight={<ArrowRightIcon />}
              />
            </Flex>
          )}
        </Flex>
      )}
    </Dialog>
  )
}

export default VideoList
