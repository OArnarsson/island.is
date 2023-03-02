import {
  institutionMapper,
  InstitutionTypes,
} from '@island.is/application/types'
import {
  Box,
  Text,
  FilterMultiChoice,
  Filter,
  FilterInput,
  Hidden,
  DatePicker,
  FilterMultiChoiceProps,
} from '@island.is/island-ui/core'
import { theme } from '@island.is/island-ui/theme'
import { useLocale } from '@island.is/localization'
import { debounceTime } from '@island.is/shared/constants'
import { useEffect, useState } from 'react'
import { useDebounce, useWindowSize } from 'react-use'
import { m } from '../../lib/messages'
import { statusMapper } from '../../shared/utils'
import { MultiChoiceFilter } from '../../types/filters'
import { Organization } from '@island.is/shared/types'

interface Props {
  onSearchChange: (query: string) => void
  onFilterChange: FilterMultiChoiceProps['onChange']
  onFilterClear: () => void
  filters: Record<MultiChoiceFilter, string[] | undefined>
  applications: string[]
  organizations: Organization[]
  numberOfDocuments?: number
}

export const Filters = ({
  onSearchChange,
  onFilterChange,
  onFilterClear,
  filters,
  applications,
  organizations,
  numberOfDocuments,
}: Props) => {
  const [nationalId, setNationalId] = useState('')
  const { formatMessage } = useLocale()
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useWindowSize()
  const asInstitutions = Object.values(InstitutionTypes)
  const availableOrganizations = organizations
    .filter((x) => asInstitutions.findIndex((y) => y === x.slug) !== -1)
    .sort((a, b) => a.title.localeCompare(b.title))

  useDebounce(
    () => {
      onSearchChange(nationalId)
    },
    debounceTime.search,
    [nationalId],
  )

  useEffect(() => {
    if (width < theme.breakpoints.md) {
      return setIsMobile(true)
    }
    setIsMobile(false)
  }, [width])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="spaceBetween"
      flexDirection={['column', 'column', 'column', 'row']}
      marginBottom={4}
    >
      <Filter
        variant={isMobile ? 'dialog' : 'popover'}
        align="left"
        reverse
        resultCount={numberOfDocuments}
        labelClear={formatMessage(m.clearFilter)}
        labelClearAll={formatMessage(m.clearAllFilters)}
        labelOpen={formatMessage(m.openFilter)}
        labelClose={formatMessage(m.closeFilter)}
        labelResult={formatMessage(m.filterResults)}
        labelTitle={formatMessage(m.filter)}
        filterInput={
          <Box display="flex" flexDirection={['column', 'column', 'row']}>
            <FilterInput
              placeholder={formatMessage(m.searchPlaceholder)}
              name="admin-applications-nationalId"
              value={nationalId}
              onChange={setNationalId}
              backgroundColor="blue"
            />
            <Box marginX={[0, 0, 2]} marginY={[2, 2, 0]}>
              <DatePicker
                id="periodFrom"
                label=""
                backgroundColor="blue"
                placeholderText={formatMessage(m.filterFrom)}
                size="xs"
                locale="is"
              />
            </Box>
            <DatePicker
              id="periodTo"
              label=""
              backgroundColor="blue"
              placeholderText={formatMessage(m.filterTo)}
              size="xs"
              locale="is"
            />
          </Box>
        }
        onFilterClear={onFilterClear}
      >
        <FilterMultiChoice
          labelClear={formatMessage(m.clearSelected)}
          singleExpand={true}
          onChange={onFilterChange}
          onClear={onFilterClear}
          categories={[
            {
              id: MultiChoiceFilter.INSTITUTION,
              label: formatMessage(m.institution),
              selected: filters[MultiChoiceFilter.INSTITUTION] ?? [],
              inline: false,
              singleOption: false,
              filters: availableOrganizations.map((x) => ({
                value: x.slug,
                label: x.title,
              })),
            },
            {
              id: MultiChoiceFilter.APPLICATION,
              label: formatMessage(m.application),
              selected: filters[MultiChoiceFilter.APPLICATION] ?? [],
              filters: applications.map((x) => ({ value: x, label: x })),
              inline: false,
              singleOption: false,
            },
            {
              id: MultiChoiceFilter.STATUS,
              label: formatMessage(m.status),
              selected: filters[MultiChoiceFilter.STATUS] ?? [],
              inline: false,
              singleOption: false,
              filters: Object.entries(statusMapper).map(([value, tag]) => ({
                value,
                label: formatMessage(tag.label),
              })),
            },
          ]}
        />
      </Filter>

      {numberOfDocuments !== undefined && (
        <Hidden below="md">
          <Text variant="small" fontWeight="semiBold" whiteSpace="nowrap">
            {formatMessage(m.resultCount, { count: numberOfDocuments })}
          </Text>
        </Hidden>
      )}
    </Box>
  )
}
