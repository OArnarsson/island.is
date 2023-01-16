// Buyers coowners
import { FieldBaseProps } from '@island.is/application/types'
import { FC } from 'react'
import { Text, GridRow, GridColumn, Box } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { overview } from '../../../lib/messages'
import { UserInformation } from '../../../shared'
import { getValueViaPath } from '@island.is/application/core'
import { ReviewGroup } from '@island.is/application/ui-components'

export const CoOwnersSection: FC<FieldBaseProps> = ({ application }) => {
  const { formatMessage } = useLocale()
  const coOwners = getValueViaPath(
    application.answers,
    'ownerCoOwner',
    [],
  ) as UserInformation[]

  return coOwners.length > 0 ? (
    <ReviewGroup isLast>
      <GridRow>
        {coOwners?.map(({ name, nationalId, email, phone }, index: number) => {
          if (name.length === 0) return null
          return (
            <GridColumn
              span={['12/12', '12/12', '12/12', '6/12']}
              key={`coowner-${index}`}
            >
              <Box marginBottom={coOwners.length === index + 1 ? 0 : 2}>
                <Text variant="h4">
                  {formatMessage(overview.labels.ownersCoOwner)}{' '}
                  {coOwners.length > 1 ? index + 1 : ''}
                </Text>
                <Text>{name}</Text>
                <Text>{nationalId}</Text>
                <Text>{email}</Text>
                <Text>{phone}</Text>
              </Box>
            </GridColumn>
          )
        })}
      </GridRow>
    </ReviewGroup>
  ) : null
}
