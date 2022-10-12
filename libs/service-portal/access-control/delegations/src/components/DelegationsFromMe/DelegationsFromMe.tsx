import { useState } from 'react'
import {
  SkeletonLoader,
  GridRow,
  GridColumn,
  GridContainer,
  Stack,
} from '@island.is/island-ui/core'
import { AuthCustomDelegation } from '@island.is/api/schema'
import { DelegationsHeader } from '../DelegationsHeader'
import { AccessCard } from '../access'
import { DelegationsEmptyState } from '../DelegationsEmptyState'
import { useAuthDelegationsQuery } from '@island.is/service-portal/graphql'
import { useNamespaces, useLocale } from '@island.is/localization'
import { m } from '@island.is/service-portal/core'
import { AccessDeleteModal } from '../access'
import { isDefined } from '@island.is/shared/utils'

export const DelegationsFromMe = () => {
  const [delegation, setDelegation] = useState<AuthCustomDelegation | null>(
    null,
  )
  useNamespaces(['sp.settings-access-control', 'sp.access-control-delegations'])
  const { formatMessage } = useLocale()
  const { data, loading, refetch } = useAuthDelegationsQuery()

  const authDelegations = (data?.authDelegations ??
    []) as AuthCustomDelegation[]

  return (
    <>
      <GridContainer>
        <GridRow>
          <GridColumn paddingBottom={4} span="12/12">
            <DelegationsHeader />
          </GridColumn>
          <GridColumn paddingBottom={4} span="12/12">
            {loading ? (
              <SkeletonLoader width="100%" height={191} />
            ) : authDelegations.length === 0 ? (
              <DelegationsEmptyState />
            ) : (
              <Stack space={3}>
                {authDelegations.map(
                  (delegation) =>
                    delegation.to && (
                      <AccessCard
                        key={delegation.id}
                        delegation={delegation}
                        group="Ísland.is"
                        onDelete={(delegation) => {
                          setDelegation(delegation)
                        }}
                      />
                    ),
                )}
              </Stack>
            )}
          </GridColumn>
        </GridRow>
      </GridContainer>
      <AccessDeleteModal
        id={`access-delete-modal-${delegation?.id}`}
        onClose={() => {
          setDelegation(null)
        }}
        onDelete={() => {
          setDelegation(null)
          refetch()
        }}
        label={formatMessage(m.accessControl)}
        title={formatMessage({
          id: 'sp.settings-access-control:access-remove-modal-content',
          defaultMessage: 'Ertu viss um að þú viljir eyða þessum aðgangi?',
        })}
        isVisible={isDefined(delegation)}
        delegation={delegation as AuthCustomDelegation}
        domain={{
          name: 'Landsbankaappið',
          imgSrc: './assets/images/educationDegree.svg',
        }}
      />
    </>
  )
}