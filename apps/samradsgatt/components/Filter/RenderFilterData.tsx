import { Box, Button, Checkbox, Icon, RadioButton } from '@island.is/island-ui/core'

const OnChangeRadio = () => {
  console.log("onChangeRadio")
}

const OnChangeCheckbox = (type, form, setForm, setData, item) => {
  const _form = {...form}
  const index = _form[type].items.findIndex((x) => x.label === item.label)
  const instance = _form[type].items[index]
  instance.checked = !instance.checked
  _form[type].items[index] = instance
  setForm(_form)
}

const RenderFilterData = (type, form, setForm, setData) => {
  if (type === 'sort') {
    return form.sort.items.map((item) => (
      <RadioButton
        checked={item.checked}
        label={item.label}
        onChange={() => OnChangeRadio()}
      />
    ))
  }
  return (
    <>
      {form[type].items.map((item) => (
        <Checkbox
          label={item.label}
          checked={item.checked}
          onChange={() => OnChangeCheckbox(type, form, setForm, setData, item)}
        />
      ))}
      <Box textAlign={'right'}>
        <Button size="small" icon="arrowForward" variant="text">
          Hreinsa síu
        </Button>
      </Box>
    </>
  )
}

export default RenderFilterData
