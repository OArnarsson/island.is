import React from 'react'
import { useNamespaces } from '@island.is/localization'
import HeaderRow from './HeaderRow'
import Column from './Column'
import Row from './Row'
import { Box } from '@island.is/island-ui/core'
import { formatNationalId } from '@island.is/service-portal/core'
import { VehiclesCurrentOwnerInfo } from '@island.is/api/schema'
import { messages } from '../../lib/messages'

interface PropTypes {
  data: VehiclesCurrentOwnerInfo
}

const OwnerInfoItem = ({ data }: PropTypes) => {
  useNamespaces('sp.vehicles')
  return (
    <Box marginBottom={4}>
      <HeaderRow>{messages.owner}</HeaderRow>
      <Row>
        <Column label={messages.owner} value={data.owner} />
        <Column
          label={messages.nationalId}
          value={data.nationalId ? formatNationalId(data.nationalId) : ''}
        />
      </Row>
      <Row>
        {data.dateOfPurchase && (
          <Column
            label={messages.purchaseDate}
            value={new Date(data.dateOfPurchase).toLocaleDateString()}
          />
        )}
      </Row>
    </Box>
  )
}

export default OwnerInfoItem
