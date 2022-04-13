import React, { useState } from 'react'
import { useLocale, useNamespaces } from '@island.is/localization'
import { ActionCard } from '@island.is/island-ui/core'
import { useHistory } from 'react-router-dom'
import { getExpiresIn } from '../../utils/dateUtils'
import { ServicePortalPath } from '@island.is/service-portal/core'
import { m } from '../../lib/messages'

export const DrivingLicense = ({
  id,
  expireDate,
}: {
  id: string
  expireDate: string
}) => {
  useNamespaces('sp.license')
  const { formatMessage } = useLocale()
  const [currentDate] = useState(new Date())
  const history = useHistory()

  const expiresIn = getExpiresIn(currentDate, new Date(expireDate))

  const handleClick = () =>
    history.push(ServicePortalPath.LicensesDrivingDetail.replace(':id', id))

  return (
    <ActionCard
      heading={formatMessage(m.drivingLicense)}
      headingVariant="h4"
      tag={{
        label: expiresIn
          ? expiresIn.value <= 0
            ? formatMessage(m.isExpired)
            : expiresIn?.key === 'months'
            ? formatMessage(m.expiresIn) +
              ' ' +
              Math.round(expiresIn?.value) +
              ' ' +
              formatMessage(m.months)
            : formatMessage(m.expiresIn) +
              ' ' +
              Math.round(expiresIn?.value) +
              ' ' +
              formatMessage(m.days)
          : formatMessage(m.isValid),
        variant: expiresIn ? 'red' : 'blue',
        outlined: false,
      }}
      image={{ variant: 'image', src: './assets/images/stjornarrad.svg' }}
      text={formatMessage(m.drivingLicenseNumber) + ' - ' + id}
      cta={{
        variant: 'text',
        onClick: handleClick,
        label: formatMessage(m.see),
      }}
    />
  )
}

export default DrivingLicense
