import {
  Box,
  Button,
  DatePicker,
  GridColumn,
  Stack,
} from '@island.is/island-ui/core'
import FilterBox from './FilterBox'

const Filter = ({ form, setForm, data, setData }) => {
  return (
    <GridColumn span={['0', '0', '3/12', '3/12', '3/12']}>
      <Stack space={2}>
        <FilterBox
          title="Röðun"
          type="sort"
          form={form}
          setForm={setForm}
          data={data}
          setData={setData}
        />
        <FilterBox
          title="Staða máls"
          type="status"
          form={form}
          setForm={setForm}
          data={data}
          setData={setData}
        />
        <FilterBox
          title="Tegund máls"
          type="type"
          form={form}
          setForm={setForm}
          data={data}
          setData={setData}
        />
        <DatePicker
          size="sm"
          locale="is"
          label="Veldu tímabil"
          placeholderText="Veldu hér"
        />
        <Box textAlign={'right'}>
          <Button size="small" icon="reload" variant="text">
            Hreinsa allar síur
          </Button>
        </Box>
      </Stack>
    </GridColumn>
  )
}

export default Filter
