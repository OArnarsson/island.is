import {
  Box,
  Button,
  DatePicker,
  GridColumn,
  Stack,
} from '@island.is/island-ui/core'
import FilterBox from './FilterBox'

const Filter = ({ data }) => {
  return (
    <GridColumn span={['0', '0', '3/12', '3/12', '3/12']}>
      <Stack space={2}>
        <FilterBox
          title="Röðun"
          type="sort"
          data={data}
        />
        <FilterBox title="Staða máls" type="status" data={data} />
        <FilterBox title="Tegund máls" type="type" data={data} />
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
