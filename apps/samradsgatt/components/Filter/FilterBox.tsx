import {
  Box,
  Button,
  Checkbox,
  Inline,
  RadioButton,
  Stack,
  Text,
} from '@island.is/island-ui/core'

import RenderFilterData from './RenderFilterData'

const FilterBox = ({ title, type, form, setForm, data, setData }) => {
  return (
    <Box
      borderColor="blue200"
      borderRadius="standard"
      borderWidth="standard"
      padding={2}
    >
      <Stack space={2}>
        <Inline justifyContent={'spaceBetween'}>
          <Text variant={'h3'}>{title}</Text>
          <Button
            colorScheme="light"
            circle
            icon={form[type].isOpen ? 'remove' : 'add'}
            title={form[type].isOpen ? 'Loka' : 'Opna'}
          />
        </Inline>
        {form[type].isOpen && <>{RenderFilterData(type, form, setForm, setData)}</>}
      </Stack>
    </Box>
  )
}

export default FilterBox
