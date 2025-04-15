import {ObjectFieldProps, ObjectInputProps} from 'sanity'

import Field from './components/Field'
import Input from './components/Input'
import {Config} from './utils/types'

export function vimeoBrowsingRendering(config: Config) {
  return {
    components: {
      field: (props: ObjectFieldProps) => {
        return <Field {...props} />
      },
      input: (props: ObjectInputProps) => {
        return <Input config={config} {...props} />
      },
    },
  }
}
