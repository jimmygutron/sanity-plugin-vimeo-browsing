import {EllipsisHorizontalIcon, LaunchIcon} from '@sanity/icons'
import {Badge, Button, Card, Flex, Menu, MenuButton, MenuItem, Stack, Text} from '@sanity/ui'
import {ReactElement, useCallback, useState} from 'react'
import {FormPatch, PatchEvent, set, unset} from 'sanity'

import {Video} from '../utils/types'

interface VideoCardProps {
  item: Video
  onChange: (patch: FormPatch | FormPatch[] | PatchEvent) => void
  onClose: () => void
  value: object | undefined
}

const VideoCard = ({value, item, onChange, onClose}: VideoCardProps): ReactElement => {
  const formatDate = (date: string) => {
    const originalDate = new Date(date)
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(originalDate)
  }

  const formatDuration = (duration: number) => {
    // Hours, minutes and seconds
    const hrs = Math.floor(duration / 3600)
    const mins = Math.floor((duration % 3600) / 60)
    const secs = Math.floor(duration % 60)

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = ''

    if (hrs > 0) {
      ret += `${hrs}:${mins < 10 ? '0' : ''}`
    }

    ret += `${mins}:${secs < 10 ? '0' : ''}`
    ret += `${secs}`

    return ret
  }

  const [isHover, setIsHover] = useState<boolean>(false)
  const onHover = useCallback(() => {
    setIsHover(true)
  }, [])
  const notHover = useCallback(() => {
    setIsHover(false)
  }, [])

  return (
    <Card
      onMouseOver={onHover}
      onMouseOut={notHover}
      style={{position: 'relative'}}
      radius={2}
      shadow={1}
    >
      <Button
        onClick={() => {
          onChange(
            set({
              ...value,
              title: item.name,
              files: item.files.map((file) => {
                return {
                  resolution: file.rendition,
                  fileUrl: file.link,
                  videoWidth: file.width,
                  videoHeight: file.height,
                }
              }),
              thumbnail: item.pictures.base_link,
              width: item.width,
              height: item.height,
              _type: 'vimeo.video',
            }),
          )
          onClose()
        }}
        padding={3}
        justify={'flex-start'}
        textAlign={'left'}
        width={'fill'}
        mode={'bleed'}
      >
        <Stack space={3}>
          <img
            style={{
              aspectRatio: '16/9',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '2px',
              backgroundColor: 'var(--card-skeleton-color-to)',
            }}
            width={item.width}
            height={item.height}
            src={item.pictures.base_link}
          />
          <Text textOverflow={'ellipsis'} size={1}>
            {item.name}
          </Text>
          <Stack space={2}>
            <Text textOverflow={'ellipsis'} size={0}>
              Duration: {formatDuration(Number(item.duration))}
            </Text>
            <Text textOverflow={'ellipsis'} size={0}>
              Created at: {formatDate(item.created_time)}
            </Text>
          </Stack>
          {item.tags.length > 0 && (
            <Flex>
              {item.tags.map((tag) => {
                return (
                  <Badge fontSize={0} key={tag.resource_key}>
                    {tag.name}
                  </Badge>
                )
              })}
            </Flex>
          )}
        </Stack>
      </Button>
      {isHover && (
        <MenuButton
          popover={{animate: true}}
          id={'menu'}
          button={
            <Button
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
              }}
              padding={2}
              mode={'ghost'}
              icon={<EllipsisHorizontalIcon />}
            />
          }
          menu={
            <Menu>
              <MenuItem
                onClick={() => {
                  window.open(`https://vimeo.com${item.manage_link}`, '_blank')
                }}
                icon={<LaunchIcon />}
                text={'Open in Vimeo'}
              />
            </Menu>
          }
        />
      )}
    </Card>
  )
}

export default VideoCard
