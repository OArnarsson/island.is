import React, { useEffect, useState } from 'react'
import { defineMessage } from 'react-intl'
import { useLocale, useNamespaces } from '@island.is/localization'
import {
  ErrorScreen,
  IntroHeader,
  ServicePortalModuleComponent,
  m as coreMessage,
} from '@island.is/service-portal/core'
import { m } from '../../lib/messages'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Locale } from '@island.is/shared/types'
import {
  GenericLicenseType,
  GenericUserLicenseFetchStatus,
  GetChildrenIdentityDocumentQuery,
  useChildrenPassport,
  useUserProfile,
} from '@island.is/service-portal/graphql'
import {
  IdentityDocumentModel,
  IdentityDocumentModelChild,
  Query,
} from '@island.is/api/schema'
import { Box, Tabs } from '@island.is/island-ui/core'

import { useFeatureFlagClient } from '@island.is/react/feature-flags'
import { FeatureFlagClient } from '@island.is/feature-flags'
import { GetIdentityDocumentQuery } from '@island.is/service-portal/graphql'
import UserLicenses from './UserLicenses'
import ChildrenLicenses from './ChildrenLicenses'

const dataFragment = gql`
  fragment genericLicenseDataFieldFragment on GenericLicenseDataField {
    type
    name
    label
    value
    fields {
      type
      name
      label
      value
      fields {
        type
        name
        label
        value
      }
    }
  }
`

const GenericLicensesQuery = gql`
  query GenericLicensesQuery($input: GetGenericLicensesInput, $locale: String) {
    genericLicenses(input: $input, locale: $locale) {
      nationalId
      license {
        type
        provider {
          id
        }
        pkpass
        pkpassVerify
        timeout
        status
        pkpassStatus
      }
      fetch {
        status
        updated
      }
      payload {
        data {
          ...genericLicenseDataFieldFragment
        }
        rawData
        metadata {
          licenseNumber
          expired
          expireDate
        }
      }
    }
  }
  ${dataFragment}
`

export const LicensesOverview: ServicePortalModuleComponent = () => {
  useNamespaces('sp.license')
  const { formatMessage } = useLocale()
  const { data: userProfile } = useUserProfile()
  const locale = (userProfile?.locale as Locale) ?? 'is'
  /**
   * Get all licenses is feature flagged
   * If off, all licenses fetched, if on only drivers license is fetched
   * Please remove all code when fully released.
   */
  const featureFlagClient: FeatureFlagClient = useFeatureFlagClient()
  const [licenseTypes, setLicenseTypes] = useState<Array<GenericLicenseType>>([
    GenericLicenseType.DriversLicense,
  ])
  const [passportEnabled, setPassportEnabled] = useState(false)

  const [
    getPassportData,
    {
      data: identityDocumentData,
      loading: passportLoading,
      error: passportError,
    },
  ] = useLazyQuery(GetIdentityDocumentQuery)

  const [
    getPassportDataChild,
    { data: childIdentityDocumentData, loading: childrenLoading },
  ] = useLazyQuery(GetChildrenIdentityDocumentQuery)

  useEffect(() => {
    const isFlagEnabled = async () => {
      const ffEnabled = await featureFlagClient.getValue(
        `servicePortalFetchAllLicenses`,
        false,
      )
      if (ffEnabled) {
        setLicenseTypes([
          GenericLicenseType.DriversLicense,
          GenericLicenseType.AdrLicense,
          GenericLicenseType.MachineLicense,
          GenericLicenseType.FirearmLicense,
        ])
      }
    }
    isFlagEnabled()

    const isPassportFlagEnabled = async () => {
      const isPassEnabled = Boolean(
        await featureFlagClient.getValue(
          `isServicePortalPassportPageEnabled`,
          false,
        ),
      )

      setPassportEnabled(isPassEnabled)
    }
    isPassportFlagEnabled()
  }, [])

  useEffect(() => {
    if (passportEnabled) {
      getPassportData()
      getPassportDataChild()
    }
  }, [passportEnabled])

  const { data, loading, error } = useQuery<Query>(GenericLicensesQuery, {
    variables: {
      locale,
      input: {
        includedTypes: licenseTypes,
      },
    },
  })
  const { genericLicenses = [] } = data ?? {}
  const passportData = identityDocumentData?.getIdentityDocument as
    | IdentityDocumentModel[]
    | undefined

  const childrenData = childIdentityDocumentData?.getIdentityDocumentChildren as
    | IdentityDocumentModelChild[]
    | undefined

  const isLoading = loading || passportLoading
  const isGenericLicenseEmpty = genericLicenses.every(
    (item) => item.payload === null,
  )
  const hasData = !!(!isGenericLicenseEmpty || passportData)

  const isError = genericLicenses?.every(
    (item) => item.fetch.status === GenericUserLicenseFetchStatus.Error,
  )
  const hasError = !!(error || isError) && !!passportError

  const hasChildren = !!childrenData?.length

  if (hasError && !loading) {
    return (
      <ErrorScreen
        figure="./assets/images/hourglass.svg"
        tagVariant="red"
        tag={formatMessage(coreMessage.errorTitle)}
        title={formatMessage(coreMessage.somethingWrong)}
        children={formatMessage(coreMessage.errorFetchModule, {
          module: formatMessage(coreMessage.licenses).toLowerCase(),
        })}
      />
    )
  }

  return (
    <>
      <IntroHeader
        title={defineMessage(m.title)}
        intro={defineMessage(m.intro)}
        marginBottom={1}
      />
      {hasChildren && passportEnabled ? (
        <Box>
          <Tabs
            label="License tabs"
            contentBackground="white"
            tabs={[
              {
                label: formatMessage(m.licenseTabPrimary),
                content: (
                  <UserLicenses
                    isLoading={isLoading}
                    hasData={hasData}
                    hasError={hasError}
                    isGenericLicenseEmpty={isGenericLicenseEmpty}
                    passportData={passportData}
                    genericLicenses={genericLicenses}
                  />
                ),
              },
              {
                label: formatMessage(m.licenseTabSecondary),
                content: (
                  <ChildrenLicenses
                    data={childrenData}
                    loading={childrenLoading}
                  />
                ),
              },
            ]}
          />
        </Box>
      ) : (
        <UserLicenses
          isLoading={isLoading}
          hasData={hasData}
          hasError={hasError}
          isGenericLicenseEmpty={isGenericLicenseEmpty}
          passportData={passportEnabled ? passportData : null}
          genericLicenses={genericLicenses}
        />
      )}
    </>
  )
}

export default LicensesOverview
