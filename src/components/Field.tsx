import {Card, Stack, Text} from '@sanity/ui'
import {ObjectFieldProps} from 'sanity'

import {Config} from '../utils/types'

export interface FieldProps extends ObjectFieldProps {
  config?: Config
}

const Field = ({...props}: FieldProps) => {
  const {children} = props
  return (
    <Card>
      <Stack space={3}>
        <Text size={1} weight={'medium'}>
          Video
        </Text>
        {children}
      </Stack>
    </Card>
  )
}

export default Field
