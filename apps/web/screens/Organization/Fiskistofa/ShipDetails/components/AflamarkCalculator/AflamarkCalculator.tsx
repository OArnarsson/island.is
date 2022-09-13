import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import cn from 'classnames'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Inline,
  LoadingDots,
  Select,
  Text,
} from '@island.is/island-ui/core'
import type {
  ExtendedShipStatusInformation,
  ExtendedAllowedCatchCategory,
  MutationGetUpdatedShipStatusForTimePeriodArgs,
  QueryGetShipStatusForTimePeriodArgs,
} from '@island.is/web/graphql/schema'
import {
  GET_AFLAMARK_INFORMATION_FOR_SHIP,
  GET_UPDATED_SHIP_STATUS_FOR_TIME_PERIOD,
} from './queries'
import { generateTimePeriodOptions, TimePeriodOption } from '../../utils'
import { QuotaTypeSelect } from '../QuotaTypeSelect'
import { useNamespace } from '@island.is/web/hooks'

import * as styles from './AflamarkCalculator.css'

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

interface AflamarkCalculatorProps {
  namespace: Record<string, string>
}

export const AflamarkCalculator = ({ namespace }: AflamarkCalculatorProps) => {
  const [shipNumber, setShipNumber] = useState<number>(-1)
  const router = useRouter()

  const n = useNamespace(namespace)

  const timePeriodOptions = useMemo(() => generateTimePeriodOptions(), [])

  const [data, setData] = useState<ExtendedShipStatusInformation | null>(null)

  const [
    selectedTimePeriod,
    setSelectedTimePeriod,
  ] = useState<TimePeriodOption>(timePeriodOptions[0])

  useEffect(() => {
    if (
      router?.query?.nr &&
      !isNaN(Number(router.query.nr)) &&
      router.query.nr.length > 0
    ) {
      setShipNumber(Number(router.query.nr))
    }
  }, [router?.query?.nr])

  // TODO: think whether this should be in done in backend
  // const [quotaState, setQuotaState] = useState({
  //   rateOfShare: 0,
  //   nextYearQuota: 0,
  //   nextYearFromQuota: 0,
  //   allowedCatch: 0,
  // })

  const initialResponse = useQuery<
    { getShipStatusForTimePeriod: ExtendedShipStatusInformation },
    QueryGetShipStatusForTimePeriodArgs
  >(GET_AFLAMARK_INFORMATION_FOR_SHIP, {
    variables: {
      input: {
        shipNumber,
        timePeriod: selectedTimePeriod.value,
      },
    },
    onCompleted(response) {
      const initialData = response?.getShipStatusForTimePeriod
      if (initialData) {
        console.log(initialData)
        setData(initialData)
      }
    },
  })

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

  const [mutate, mutationResponse] = useMutation<
    { getUpdatedShipStatusForTimePeriod: ExtendedShipStatusInformation },
    MutationGetUpdatedShipStatusForTimePeriodArgs
  >(GET_UPDATED_SHIP_STATUS_FOR_TIME_PERIOD, {
    onCompleted(response) {
      const mutationData = response?.getUpdatedShipStatusForTimePeriod
      if (mutationData) {
        const categories = []
        for (const category of data?.allowedCatchCategories ?? []) {
          const extendedCategory = {
            ...category,
            ...mutationData.allowedCatchCategories?.find(
              (c) => c.id === category.id,
            ),
          }
          // Make sure that category with id 0 stays at the front
          if (extendedCategory.id === 0) {
            categories.unshift(extendedCategory)
          } else {
            categories.push(extendedCategory)
          }
        }
        setData({
          shipInformation: mutationData.shipInformation,
          allowedCatchCategories: categories,
        })
      }
    },
  })

  const loading = initialResponse.loading || mutationResponse.loading
  const error = initialResponse.error

  const [changes, setChanges] = useState<Changes>({})
  const [changeErrors, setChangeErrors] = useState<ChangeErrors>({})

  const getFieldDifference = (
    category: ExtendedAllowedCatchCategory,
    fieldName: string,
  ) => {
    const a = mutationResponse?.data?.getUpdatedShipStatusForTimePeriod?.allowedCatchCategories?.find(
      (c) => c.id === category.id,
    )?.[fieldName]
    const b = initialResponse?.data?.getShipStatusForTimePeriod?.allowedCatchCategories?.find(
      (c) => c.id === category.id,
    )?.[fieldName]

    if (!a || !b) return undefined

    return a - b
  }

  const calculate = () => {
    const changeValues = Object.values(changes)

    if (!validateChanges()) {
      return
    }

    mutate({
      variables: {
        input: {
          shipNumber,
          timePeriod: selectedTimePeriod.value,
          changes: changeValues.map((change) => ({
            ...change,
            catchChange: Number(change.catchChange ?? 0),
            allowedCatchChange: Number(change.allowedCatchChange ?? 0),
          })),
        },
      },
    })
  }

  return (
    <Box margin={6}>
      <Box display={['block', 'block', 'flex']} justifyContent="spaceBetween">
        <Inline space={3} flexWrap="wrap">
          <Box className={styles.selectBox}>
            <Select
              size="sm"
              label="Tímabil"
              name="timabil-select"
              options={timePeriodOptions}
              value={selectedTimePeriod}
              onChange={(timePeriod) => {
                setSelectedTimePeriod(timePeriod as TimePeriodOption)
              }}
            />
          </Box>
          <QuotaTypeSelect
            type="aflamark"
            timePeriod={selectedTimePeriod.value}
          />
        </Inline>
        <Box marginTop={[3, 3, 0]}>
          <Inline alignY="center" space={3}>
            <Button
              onClick={() => {
                setData(initialResponse.data.getShipStatusForTimePeriod)
                setChanges({})
                setChangeErrors({})
              }}
              variant="ghost"
              size="small"
            >
              Frumstilla
            </Button>
            <Button
              disabled={Object.keys(changes).length === 0}
              onClick={calculate}
              size="small"
            >
              Reikna
            </Button>
          </Inline>
        </Box>
      </Box>

      <Box
        width="full"
        textAlign="center"
        style={{ visibility: loading ? 'visible' : 'hidden' }}
      >
        <LoadingDots />
      </Box>

      {!data?.allowedCatchCategories?.length && !loading && !error && (
        <Box width="full" textAlign="center">
          <Text>Engar niðurstöður fundust</Text>
        </Box>
      )}

      {error && (
        <Box width="full" textAlign="center">
          <Text>Villa kom upp við að sækja aflamarksupplýsingar</Text>
        </Box>
      )}

      {data?.allowedCatchCategories?.length > 0 && (
        <Box className={styles.tableBox}>
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

              <tr>
                <td className={styles.visualSeparationLine}>Heildaraflamark</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td
                    className={styles.visualSeparationLine}
                    key={category.name}
                  >
                    {category.totalAllowedCatch}
                  </td>
                ))}
              </tr>

              <tr>
                <td>{n('hlutdeild', 'Hlutdeild')}</td>

                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>
                    {category.id === 0 ? (
                      category.rateOfShare
                    ) : (
                      <input
                        value={category.rateOfShare}
                        onChange={(ev) => {
                          // TODO: store changes in state
                        }}
                      />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>{n('aNaestaArKvoti', 'Á næsta ár kvóti')}</td>
                {/* TODO: add input box */}
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>
                    {category.id === 0 ? (
                      category.nextYearQuota
                    ) : (
                      <input
                        value={category.nextYearQuota}
                        onChange={(ev) => {
                          // TODO: store changes in state
                        }}
                      />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>{n('afNaestaArKvoti', 'Af næsta ár kvóti')}</td>
                {data?.allowedCatchCategories?.map((category) => (
                  <td key={category.name}>
                    {category.id === 0 ? (
                      category.nextYearFromQuota
                    ) : (
                      <input
                        value={category.nextYearFromQuota}
                        onChange={(ev) => {
                          // TODO: store changes in state
                        }}
                      />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  )
}