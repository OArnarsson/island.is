import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import cn from 'classnames'
import {
  Inline,
  LoadingDots,
  Box,
  Button,
  Select,
  Text,
  Tag,
} from '@island.is/island-ui/core'
import {
  AllowedCatchCategory,
  MutationGetUpdatedShipStatusForCalendarYearArgs,
  QueryGetQuotaTypesForCalendarYearArgs,
  QueryGetQuotaTypesForTimePeriodArgs,
  QueryGetShipStatusForCalendarYearArgs,
  QuotaType,
  ShipStatusInformation,
} from '@island.is/web/graphql/schema'
import { useEffect, useMemo, useState } from 'react'
import {
  GET_SHIP_STATUS_FOR_TIME_PERIOD,
  GET_UPDATED_SHIP_STATUS_FOR_CALENDAR_YEAR,
} from './queries'
import { getYearOptions, YearOption } from '../../utils'
import { useRouter } from 'next/router'
import { useNamespace } from '@island.is/web/hooks'
import { GET_QUOTA_TYPES_FOR_CALENDAR_YEAR } from '../QuotaTypeSelect/queries'

import * as styles from './DeilistofnaCalculator.css'

const emptyValue = { value: -1, label: '' }

type Changes = Record<
  number,
  {
    id: number
    catchChange: string | undefined
    allowedCatchChange: string | undefined
  }
>

type ChangeErrors = Record<
  number,
  {
    id: number
    catchChange: boolean
    allowedCatchChange: boolean
  }
>

interface DeilistofnaCalculatorProps {
  namespace: Record<string, string>
}

export const DeilistofnaCalculator = ({
  namespace,
}: DeilistofnaCalculatorProps) => {
  const router = useRouter()
  const yearOptions = useMemo(() => getYearOptions(), [])

  const shipNumber = useMemo<number | null>(() => {
    if (
      router?.query?.nr &&
      !isNaN(Number(router.query.nr)) &&
      router.query.nr.length > 0
    ) {
      return Number(router.query.nr)
    }
    return null
  }, [router?.query?.nr])

  const n = useNamespace(namespace)

  const [data, setData] = useState<ShipStatusInformation | null>(null)

  const [selectedYear, setSelectedYear] = useState<YearOption>(yearOptions[0])

  const [fetchShipStatus, initialResponse] = useLazyQuery<
    { getShipStatusForCalendarYear: ShipStatusInformation },
    QueryGetShipStatusForCalendarYearArgs
  >(GET_SHIP_STATUS_FOR_TIME_PERIOD, {
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      const initialData = response?.getShipStatusForCalendarYear
      if (initialData) {
        const initialCategories = initialData?.allowedCatchCategories ?? []
        const codValue = initialCategories.find((c) => c.id === 0)
        const categories = [
          codValue,
          ...initialCategories.filter((c) => c.id !== 0),
        ]
        setData({
          ...initialData,
          allowedCatchCategories: categories,
        })
      }
    },
  })

  const [fetchUpdatedShipStatus, updatedResponse] = useMutation<
    { getUpdatedShipStatusForCalendarYear: ShipStatusInformation },
    MutationGetUpdatedShipStatusForCalendarYearArgs
  >(GET_UPDATED_SHIP_STATUS_FOR_CALENDAR_YEAR, {
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      const mutationData = response?.getUpdatedShipStatusForCalendarYear
      if (mutationData) {
        const initialCategories = mutationData?.allowedCatchCategories ?? []
        const codValue = initialCategories.find((c) => c.id === 0)
        const categories = [
          codValue,
          ...initialCategories.filter((c) => c.id !== 0),
        ]
        setData({
          ...mutationData,
          allowedCatchCategories: categories,
        })
      }
    },
  })

  const quotaTypeResponse = useQuery<
    { getQuotaTypesForCalendarYear: QuotaType[] },
    QueryGetQuotaTypesForCalendarYearArgs
  >(GET_QUOTA_TYPES_FOR_CALENDAR_YEAR, {
    variables: {
      input: {
        year: selectedYear.value,
      },
    },
    onCompleted(res) {
      const quotaData = res?.getQuotaTypesForCalendarYear
      if (!quotaData) return
      const quotaTypes = quotaData
        .filter((qt) => qt?.name)
        .map((qt) => ({
          value: qt.id,
          label: qt.name,
        }))
      if (selectedOptions.length === 0) {
        quotaTypes.sort((a, b) => a.label.localeCompare(b.label))
        setOptionsInDropdown(quotaTypes)
      }
    },
  })

  useEffect(() => {
    if (
      data?.allowedCatchCategories?.length > 0 &&
      quotaTypeResponse?.data?.getQuotaTypesForCalendarYear?.length > 0
    ) {
      const quotaTypes = quotaTypeResponse.data.getQuotaTypesForCalendarYear
      setOptionsInDropdown(
        quotaTypes
          .filter(
            (t) => !data?.allowedCatchCategories?.find((c) => c?.id === t?.id),
          )
          .map((t) => ({ label: t.name, value: t.id })),
      )
    }
  }, [data, quotaTypeResponse])

  const getFieldDifference = (
    category: AllowedCatchCategory,
    fieldName: string,
  ) => {
    const a = updatedResponse?.data?.getUpdatedShipStatusForCalendarYear?.allowedCatchCategories?.find(
      (c) => c.id === category.id,
    )?.[fieldName]
    const b = initialResponse?.data?.getShipStatusForCalendarYear?.allowedCatchCategories?.find(
      (c) => c.id === category.id,
    )?.[fieldName]

    if (!a || !b) return undefined

    return a - b
  }

  const [changes, setChanges] = useState<Changes>({})
  const [changeErrors, setChangeErrors] = useState<ChangeErrors>({})
  const [optionsInDropdown, setOptionsInDropdown] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])

  const validateChanges = () => {
    let valid = true
    const errors = {}
    for (const change of Object.values(changes)) {
      if (isNaN(Number(change?.catchChange)) && change?.catchChange) {
        valid = false
        errors[change?.id] = { ...errors[change?.id], catchChange: true }
      }
      if (
        isNaN(Number(change?.allowedCatchChange)) &&
        change?.allowedCatchChange
      ) {
        valid = false
        errors[change?.id] = {
          ...errors[change?.id],
          allowedCatchChange: true,
        }
      }
    }
    setChangeErrors(errors)
    return valid
  }

  const calculate = () => {
    const changeValues = Object.values(changes)
    if (!validateChanges()) {
      return
    }
    fetchUpdatedShipStatus({
      variables: {
        input: {
          shipNumber,
          year: selectedYear.value,
          changes: changeValues.map((change) => ({
            ...change,
            catchChange: Number(change.catchChange ?? 0),
            allowedCatchChange: Number(change.allowedCatchChange ?? 0),
          })),
        },
      },
    })
  }

  const reset = () => {
    const initialData = initialResponse?.data?.getShipStatusForCalendarYear
    if (initialData) {
      const initialCategories = initialData?.allowedCatchCategories ?? []
      const codValue = initialCategories.find((c) => c.id === 0)
      const categories = [
        codValue,
        ...initialCategories.filter((c) => c.id !== 0),
      ]
      setData({
        ...initialData,
        allowedCatchCategories: categories,
      })
    }
    setSelectedOptions((prevSelected) => {
      setOptionsInDropdown((prevDropdown) => {
        const updatedDropdown = prevDropdown.concat(prevSelected)
        updatedDropdown.sort((a, b) => a.label.localeCompare(b.label))
        return updatedDropdown
      })
      return []
    })
  }

  const loading = initialResponse.loading || updatedResponse.loading
  const error = initialResponse.error || updatedResponse.error

  return (
    <Box margin={6}>
      <Box display={['block', 'block', 'flex']} justifyContent="spaceBetween">
        <Inline space={3}>
          <Box className={styles.selectBox}>
            <Select
              size="sm"
              label="Ár"
              name="year-select"
              options={yearOptions}
              value={selectedYear}
              onChange={(newYear) => {
                fetchShipStatus({
                  variables: {
                    input: {
                      shipNumber: shipNumber,
                      year: (newYear as YearOption).value,
                    },
                  },
                })
                setSelectedYear(newYear as YearOption)
              }}
            />
          </Box>
          <Box className={styles.selectBox} marginBottom={3}>
            <Select
              size="sm"
              label="Bæta við tegund"
              name="tegund-fiskur-select"
              options={optionsInDropdown}
              onChange={(selectedOption: { value: number; label: string }) => {
                if (
                  !initialResponse?.data?.getShipStatusForCalendarYear
                    ?.allowedCatchCategories?.length
                ) {
                  return
                }
                setSelectedOptions((prev) => prev.concat(selectedOption))
                setOptionsInDropdown((prev) => {
                  return prev.filter((o) => o.value !== selectedOption.value)
                })
                setData((prev) => {
                  return {
                    ...prev,
                    allowedCatchCategories: prev.allowedCatchCategories
                      .filter((c) => c.id !== selectedOption.value)
                      .concat({
                        name: selectedOption.label,
                        id: selectedOption.value,
                        allocation: 0,
                        allowedCatch: 0,
                        betweenShips: 0,
                        betweenYears: 0,
                        catch: 0,
                        displacement: 0,
                        excessCatch: 0,
                        newStatus: 0,
                        nextYear: 0,
                        specialAlloction: 0,
                        status: 0,
                        unused: 0,
                      }),
                  }
                })
              }}
              value={emptyValue}
            />
          </Box>
        </Inline>

        <Box marginTop={[3, 3, 0]}>
          <Inline alignY="center" space={3}>
            <Button onClick={reset} variant="ghost" size="small">
              {n('reset', 'Frumstilla')}
            </Button>
            <Button onClick={calculate} size="small">
              {n('calculate', 'Reikna')}
            </Button>
          </Inline>
        </Box>
      </Box>

      <Box className={styles.tagContainer}>
        <Inline alignY="center" space={2}>
          {selectedOptions.map((o) => (
            <Tag
              onClick={() => {
                setSelectedOptions((prevSelected) =>
                  prevSelected.filter((prev) => prev.value !== o.value),
                )
                setOptionsInDropdown((prevDropdown) => {
                  const updatedDropdown = prevDropdown.concat(o)
                  updatedDropdown.sort((a, b) => a.label.localeCompare(b.label))
                  return updatedDropdown
                })
                setData((prev) => ({
                  ...prev,
                  allowedCatchCategories: prev?.allowedCatchCategories?.filter(
                    (c) => c?.id !== o.value,
                  ),
                }))
              }}
              key={o.value}
            >
              <Box flexDirection="row" alignItems="center">
                {o.label}
                <span className={styles.crossmark}>&#10005;</span>
              </Box>
            </Tag>
          ))}
          {selectedOptions.length > 0 && (
            <Button
              onClick={() => {
                setSelectedOptions((prevSelected) => {
                  setData((prev) => {
                    const selectedIds = prevSelected.map((s) => s.value)
                    return {
                      ...prev,
                      allowedCatchCategories: prev?.allowedCatchCategories?.filter(
                        (c) => !selectedIds.includes(c?.id),
                      ),
                    }
                  })
                  setOptionsInDropdown((prevDropdown) => {
                    const updatedDropdown = prevDropdown.concat(prevSelected)
                    updatedDropdown.sort((a, b) =>
                      a.label.localeCompare(b.label),
                    )
                    return updatedDropdown
                  })
                  return []
                })
              }}
              variant="text"
              size="small"
              colorScheme="default"
            >
              Hreinsa allt
            </Button>
          )}
        </Inline>
      </Box>

      <Box
        width="full"
        textAlign="center"
        style={{ visibility: loading ? 'visible' : 'hidden' }}
      >
        <LoadingDots />
      </Box>

      {!loading && !data && !error && (
        <Box width="full" textAlign="center">
          <Text>{n('noResultsFound', 'Engar niðurstöður fundust')}</Text>
        </Box>
      )}

      {error && (
        <Box width="full" textAlign="center">
          <Text>
            {n('deilistofnaError', 'Villa kom upp við að sækja deilistofna')}
          </Text>
        </Box>
      )}

      {data?.allowedCatchCategories && (
        <Box marginTop={3} className={styles.tableBox}>
          <table className={styles.tableContainer}>
            <thead className={styles.tableHead}>
              <tr>
                <th>{n('kvotategund', 'Kvótategund')}</th>
                {data?.allowedCatchCategories?.map((category) => {
                  return <th key={category.name}>{category.name}</th>
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{n('uthlutun', 'Úthlutun')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.allocation}</td>
                ))}
              </tr>
              <tr>
                <td>{n('serstokUthlutun', 'Sérst. úthl.')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.specialAlloction}</td>
                ))}
              </tr>
              <tr>
                <td>{n('milliAra', 'Milli ára')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.betweenYears}</td>
                ))}
              </tr>
              <tr>
                <td>{n('milliSkipa', 'Milli skipa')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.betweenShips}</td>
                ))}
              </tr>
              <tr>
                <td>{n('aflamarksbreyting', 'Aflamarksbr.')}</td>
                {/* TODO: keep track of difference from initial aflamark to what it is now */}
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>
                    {category.id === 0 ? (
                      getFieldDifference(category, 'allowedCatch')
                    ) : (
                      <input
                        onKeyDown={(ev) => {
                          if (ev.key === 'Enter') calculate()
                        }}
                        className={cn({
                          [styles.error]:
                            changeErrors?.[category.id]?.allowedCatchChange,
                        })}
                        value={changes?.[category.id]?.allowedCatchChange ?? ''}
                        onChange={(ev) => {
                          setChanges((prevChanges) => {
                            return {
                              ...prevChanges,
                              [category.id]: {
                                id: category.id,
                                allowedCatchChange: ev.target.value,
                                catchChange:
                                  prevChanges[category.id]?.catchChange,
                              },
                            }
                          })
                        }}
                      />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>{n('aflamark', 'Aflamark')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.allowedCatch}</td>
                ))}
              </tr>
              <tr>
                <td>{n('afli', 'Afli')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.catch}</td>
                ))}
              </tr>
              <tr>
                <td>{n('aflabreyting', 'Aflabreyting')}</td>

                {data?.allowedCatchCategories?.map((category) => {
                  return (
                    <td key={category.name}>
                      {/* TODO: keep track of difference from initial afli to what it is now */}
                      {category.id === 0 ? (
                        getFieldDifference(category, 'catch')
                      ) : (
                        <input
                          onKeyDown={(ev) => {
                            if (ev.key === 'Enter') calculate()
                          }}
                          className={cn({
                            [styles.error]:
                              changeErrors?.[category.id]?.catchChange,
                          })}
                          value={changes?.[category.id]?.catchChange ?? ''}
                          onChange={(ev) => {
                            setChanges((prevChanges) => {
                              return {
                                ...prevChanges,
                                [category.id]: {
                                  id: category.id,
                                  catchChange: ev.target.value,
                                  allowedCatchChange:
                                    prevChanges[category.id]
                                      ?.allowedCatchChange,
                                },
                              }
                            })
                          }}
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td>{n('stada', 'Staða')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.status}</td>
                ))}
              </tr>
              <tr>
                <td>{n('tilfaersla', 'Tilfærsla')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.displacement}</td>
                ))}
              </tr>
              <tr>
                <td>{n('nyStada', 'Ný staða')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.newStatus}</td>
                ))}
              </tr>
              <tr>
                <td>{n('aNaestaAr', 'Á næsta ár')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.nextYear}</td>
                ))}
              </tr>
              <tr>
                <td>{n('umframafli', 'Umframafli')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.excessCatch}</td>
                ))}
              </tr>
              <tr>
                <td>{n('onotad', 'Ónotað')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>{category.unused}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  )
}
