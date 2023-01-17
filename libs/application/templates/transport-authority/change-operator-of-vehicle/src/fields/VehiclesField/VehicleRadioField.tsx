import {
  Box,
  Text,
  SkeletonLoader,
  AlertMessage,
  BulletList,
  Bullet,
  InputError,
} from '@island.is/island-ui/core'
import { FC, useState } from 'react'
import { VehiclesCurrentVehicle } from '../../types'
import { RadioController } from '@island.is/shared/form-fields'
import { useFormContext } from 'react-hook-form'
import { getValueViaPath } from '@island.is/application/core'
import { FieldBaseProps } from '@island.is/application/types'
import { gql, useQuery } from '@apollo/client'
import { GET_CURRENT_VEHICLES_WITH_OWNERCHANGE_CHECKS } from '../../graphql/queries'
import { VehiclesCurrentVehicleWithOwnerchangeChecks } from '@island.is/api/schema'
import { useLocale } from '@island.is/localization'
import { applicationCheck, information, error } from '../../lib/messages'

interface Option {
  value: string
  label: React.ReactNode
}

interface VehicleSearchFieldProps {
  currentVehicleList: VehiclesCurrentVehicle[]
}

export const VehicleRadioField: FC<
  VehicleSearchFieldProps & FieldBaseProps
> = ({ currentVehicleList, application, errors }) => {
  const { formatMessage } = useLocale()
  const { register } = useFormContext()

  const [plate, setPlate] = useState<string>(
    getValueViaPath(application.answers, 'pickVehicle.plate', '') as string,
  )
  const [color, setColor] = useState<string | undefined>(
    getValueViaPath(application.answers, 'pickVehicle.color', undefined) as
      | string
      | undefined,
  )
  const [type, setType] = useState<string | undefined>(
    getValueViaPath(application.answers, 'pickVehicle.type', undefined) as
      | string
      | undefined,
  )

  // TODO: Add operator validation query once Samgöngustofa has finished it
  const { data, loading } = useQuery(
    gql`
      ${GET_CURRENT_VEHICLES_WITH_OWNERCHANGE_CHECKS}
    `,
    {
      variables: {
        input: {
          showOwned: true,
          showCoOwned: false,
          showOperated: false,
        },
      },
    },
  )

  const onRadioControllerSelect = (s: string) => {
    const currentVehicle = currentVehicleList[parseInt(s, 10)]
    setPlate(currentVehicle.permno || '')
    setColor(currentVehicle.color || undefined)
    setType(currentVehicle.make || undefined)
  }

  const vehicleOptions = (
    vehicles: VehiclesCurrentVehicleWithOwnerchangeChecks[],
  ) => {
    const options = [] as Option[]

    for (const [index, vehicle] of vehicles.entries()) {
      const disabled = false
      //   !vehicle.isDebtLess || !!vehicle.ownerChangeErrorMessages?.length
      options.push({
        value: `${index}`,
        label: (
          <Box display="flex" flexDirection="column">
            <Box>
              <Text variant="default" color={disabled ? 'dark200' : 'dark400'}>
                {vehicle.make}
              </Text>
              <Text variant="small" color={disabled ? 'dark200' : 'dark400'}>
                {vehicle.color} - {vehicle.permno}
              </Text>
            </Box>
            {disabled && (
              <Box marginTop={2}>
                <AlertMessage
                  type="error"
                  title={formatMessage(
                    information.labels.pickVehicle.hasErrorTitle,
                  )}
                  message={
                    <Box>
                      <BulletList>
                        {!vehicle.isDebtLess && (
                          <Bullet>
                            {formatMessage(
                              information.labels.pickVehicle.isNotDebtLessTag,
                            )}
                          </Bullet>
                        )}
                        {!!vehicle.ownerChangeErrorMessages?.length &&
                          vehicle.ownerChangeErrorMessages?.map((error) => {
                            const message = formatMessage(
                              getValueViaPath(
                                applicationCheck.validation,
                                error.errorNo || '',
                              ),
                            )
                            const defaultMessage = error.defaultMessage
                            const fallbackMessage =
                              formatMessage(
                                applicationCheck.validation
                                  .fallbackErrorMessage,
                              ) +
                              ' - ' +
                              error.errorNo

                            return (
                              <Bullet>
                                {message || defaultMessage || fallbackMessage}
                              </Bullet>
                            )
                          })}
                      </BulletList>
                    </Box>
                  }
                />
              </Box>
            )}
          </Box>
        ),
      })
    }
    return options
  }

  return (
    <div>
      {loading ? (
        <SkeletonLoader
          height={100}
          space={2}
          repeat={currentVehicleList.length}
          borderRadius="large"
        />
      ) : (
        <RadioController
          id="pickVehicle.vehicle"
          largeButtons
          backgroundColor="blue"
          onSelect={onRadioControllerSelect}
          options={vehicleOptions(
            data.currentVehiclesWithOwnerchangeChecks as VehiclesCurrentVehicleWithOwnerchangeChecks[],
          )}
        />
      )}
      <input
        type="hidden"
        value={plate}
        {...register('pickVehicle.plate', { required: true })}
      />
      <input
        type="hidden"
        value={color}
        {...register('pickVehicle.color', { required: true })}
      />
      <input
        type="hidden"
        value={type}
        {...register('pickVehicle.type', { required: true })}
      />
      {plate.length === 0 && errors && errors.pickVehicle && (
        <InputError errorMessage={formatMessage(error.requiredValidVehicle)} />
      )}
    </div>
  )
}
