import {
  Box,
  Button,
  Checkbox,
  Inline,
  RadioButton,
  Stack,
  Text,
} from '@island.is/island-ui/core'

const handleRadioChange = () => {}

const RenderData = (type: string, data: any) => {
  if (type === 'sort') {
    return data.sort.items.map((item) => (
      <RadioButton checked={item.checked} label={item.label} />
    ))
  } else {
    return data[type].items.map((item) => (
      <Checkbox label={item.label} checked={item.checked} />
    ))
  }
}

const FilterBox = ({ title, type, data }) => {
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
            icon={data[type].isOpen ? 'remove' : 'add'}
            title={data[type].isOpen ? 'Loka' : 'Opna'}
          />
        </Inline>
        {data[type].isOpen && <>{RenderData(type, data)}</>}
      </Stack>
    </Box>
  )
}

export default FilterBox
