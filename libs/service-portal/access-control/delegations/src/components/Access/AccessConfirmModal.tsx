import { AuthCustomDelegation } from '@island.is/api/schema'
import { useAuth } from '@island.is/auth/react'
import {
  AlertBanner,
  Box,
  GridRow,
  GridColumn,
  Text,
  useBreakpoint,
  Divider,
} from '@island.is/island-ui/core'
import { useNamespaces, useLocale } from '@island.is/localization'
import { formatNationalId } from '@island.is/service-portal/core'
import { useUpdateAuthDelegationMutation } from '@island.is/service-portal/graphql'
import { useState } from 'react'
import { DelegationsFormFooter } from '../DelegationsFormFooter'
import { IdentityCard } from '../IdentityCard'
import { Modal, ModalProps } from '../Modal'
import format from 'date-fns/format'
import { DATE_FORMAT } from './AccessItem'
import { MappedScope } from './AccessForm'
import { AccessItemHeader } from './AccessItemHeader'
import * as accessItemStyles from './AccessItem.css'

type AccessConfirmModalProps = ModalProps & {
  delegation: AuthCustomDelegation
  domain: {
    name: string | undefined
    imgSrc: string | undefined
  }
  scopes: MappedScope[]
  onConfirm(): void
  validityPeriod: Date | null
}

export const AccessConfirmModal = ({
  delegation,
  domain,
  onClose,
  onConfirm,
  scopes,
  validityPeriod,
  ...rest
}: AccessConfirmModalProps) => {
  useNamespaces(['sp.settings-access-control', 'sp.access-control-delegations'])
  const { formatMessage } = useLocale()
  const { userInfo } = useAuth()
  const [error, setError] = useState(false)
  const { md } = useBreakpoint()
  const [updateAuthDelegationn, { loading }] = useUpdateAuthDelegationMutation()

  const onConfirmHandler = async () => {
    if (!delegation.id) return

    try {
      const { errors } = await updateAuthDelegationn({
        variables: {
          input: {
            delegationId: delegation.id,
            scopes: [],
          },
        },
      })

      if (errors) {
        setError(true)
        return
      }

      onConfirm()
    } catch (error) {
      setError(true)
    }
  }

  const toName = delegation?.to?.name
  const toNationalId = delegation?.to?.nationalId
  const fromName = userInfo?.profile.name
  const fromNationalId = userInfo?.profile.nationalId

  return (
    <Modal {...rest} onClose={onClose}>
      <Box marginY={[4, 4, 8]} display="flex" flexDirection="column" rowGap={3}>
        {error && (
          <Box paddingBottom={3}>
            <AlertBanner
              description={formatMessage({
                id: 'sp.access-control-delegations:confirm-error',
                defaultMessage:
                  'Ekki tókst að vista réttindi. Vinsamlegast reyndu aftur',
              })}
              variant="error"
            />
          </Box>
        )}
        <Box
          width="full"
          display="flex"
          flexDirection={['column', 'column', 'column', 'row']}
          rowGap={[3, 3, 3, 0]}
          columnGap={[0, 0, 0, 3]}
        >
          {fromName && fromNationalId && (
            <IdentityCard
              label={formatMessage({
                id: 'sp.access-control-delegations.delegation-to',
                defaultMessage: 'Aðgangsveitandi',
              })}
              title={fromName}
              description={formatNationalId(fromNationalId)}
              color="blue"
            />
          )}
          {toName && toNationalId && (
            <IdentityCard
              label={formatMessage({
                id: 'sp.access-control-delegations:signed-in-user',
                defaultMessage: 'Aðgangshafi',
              })}
              title={toName}
              description={formatNationalId(toNationalId)}
              color="purple"
            />
          )}
        </Box>
        {domain?.name && domain?.imgSrc && (
          <IdentityCard
            label={formatMessage({
              id: 'sp.access-control-delegations:domain',
              defaultMessage: 'Kerfi',
            })}
            title={domain.name}
            imgSrc={domain.imgSrc}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" rowGap={3} marginTop={6}>
        <Box display="flex" alignItems="center" justifyContent="spaceBetween">
          <Text variant="h4" as="h4">
            {formatMessage({
              id: 'sp.access-control-delegations:access-title',
              defaultMessage: 'Réttindi',
            })}
          </Text>
          {validityPeriod && (
            <Box display="flex" flexDirection="column" alignItems="flexEnd">
              <Text variant="small">
                {formatMessage({
                  id:
                    'sp.settings-access-control:access-item-datepicker-label-mobile',
                  defaultMessage: 'Í gildi til',
                })}
              </Text>
              <Text fontWeight="semiBold">
                {format(validityPeriod, DATE_FORMAT)}
              </Text>
            </Box>
          )}
        </Box>
        <Box marginBottom={[0, 0, 12]}>
          <AccessItemHeader hideValidityPeriod={!!validityPeriod} />
          <Box className={accessItemStyles.dividerContainer}>
            <Divider />
          </Box>
          {scopes?.map(
            (scope, index) =>
              scope?.name && (
                <div key={index}>
                  <GridRow className={accessItemStyles.row} key={index}>
                    <GridColumn
                      span={['12/12', '12/12', '3/12']}
                      className={accessItemStyles.item}
                    >
                      <Text fontWeight="light">{scope?.name}</Text>
                    </GridColumn>
                    {((!md && scope?.description?.trim()) || md) && (
                      <GridColumn
                        span={['12/12', '12/12', '4/12', '5/12']}
                        className={accessItemStyles.item}
                        paddingTop={[3, 3, 3, 0]}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          className={accessItemStyles.rowGap}
                        >
                          {!md && (
                            <Text variant="small" fontWeight="semiBold">
                              {formatMessage({
                                id: 'sp.access-control-delegation:grant',
                                defaultMessage: 'Heimild',
                              })}
                            </Text>
                          )}
                          <Text variant="small" fontWeight="light">
                            {scope?.description}
                          </Text>
                        </Box>
                      </GridColumn>
                    )}
                    {!validityPeriod && scope?.validTo && (
                      <GridColumn
                        span={['12/12', '8/12', '5/12', '4/12']}
                        paddingTop={[2, 2, 2, 0]}
                      >
                        <Text variant="small">
                          {format(new Date(scope?.validTo), DATE_FORMAT)}
                        </Text>
                      </GridColumn>
                    )}
                  </GridRow>
                  <Box className={accessItemStyles.dividerContainer}>
                    <Divider />
                  </Box>
                </div>
              ),
          )}
        </Box>
      </Box>
      <DelegationsFormFooter
        loading={loading}
        showDivider={false}
        onCancel={onClose}
        onConfirm={onConfirmHandler}
        confirmLabel={formatMessage({
          id: 'sp.settings-access-control:empty-new-access',
          defaultMessage: 'Veita aðgang',
        })}
        confirmIcon="checkmark"
      />
    </Modal>
  )
}
