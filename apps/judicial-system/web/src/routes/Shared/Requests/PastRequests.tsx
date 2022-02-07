import React, { useContext, useMemo } from 'react'
import { useIntl } from 'react-intl'
import parseISO from 'date-fns/parseISO'

import { Box, Text, Tag } from '@island.is/island-ui/core'
import {
  CaseAppealDecision,
  CaseDecision,
  CaseState,
  CaseType,
  Defendant,
  isInvestigationCase,
  UserRole,
} from '@island.is/judicial-system/types'
import type { Case } from '@island.is/judicial-system/types'
import { UserContext } from '@island.is/judicial-system-web/src/components/UserProvider/UserProvider'
import {
  capitalize,
  caseTypes,
  formatDate,
  formatNationalId,
} from '@island.is/judicial-system/formatters'
import { Table } from '@island.is/judicial-system-web/src/components'
import { core, requests } from '@island.is/judicial-system-web/messages'

import { getAppealDate, mapCaseStateToTagVariant } from './utils'
import * as styles from './Requests.css'

interface Props {
  cases: Case[]
  onRowClick: (id: string) => void
  isHighCourtUser: boolean
}

const PastRequests: React.FC<Props> = (props) => {
  const { cases, onRowClick, isHighCourtUser } = props

  const { user } = useContext(UserContext)
  const { formatMessage } = useIntl()

  const sortableColumnIds = ['courtCaseNumber', 'accusedName', 'type']
  const isCourtRole =
    user?.role === UserRole.JUDGE || user?.role === UserRole.REGISTRAR
  const prColumns = [
    {
      Header: formatMessage(
        requests.sections.pastRequests.table.headers.caseNumber,
      ),
      accessor: 'courtCaseNumber' as keyof Case,
      Cell: (row: {
        row: {
          original: { courtCaseNumber: string; policeCaseNumber: string }
        }
      }) => {
        return (
          <>
            <Box component="span" display="block">
              {row.row.original.courtCaseNumber}
            </Box>
            <Text as="span" variant="small">
              {row.row.original.policeCaseNumber}
            </Text>
          </>
        )
      },
    },
    {
      Header: capitalize(formatMessage(core.defendant, { suffix: 'i' })),
      accessor: 'accusedName' as keyof Case,
      Cell: (row: {
        row: { original: { accusedName: string; defendants: Defendant[] } }
      }) => {
        return row.row.original.defendants &&
          row.row.original.defendants.length > 0 ? (
          <>
            <Box component="span" display="block">
              {row.row.original.defendants[0].name}
            </Box>
            {row.row.original.defendants.length === 1 ? (
              <Text as="span" variant="small" color="dark400">
                {`kt. ${
                  row.row.original.defendants[0].nationalId
                    ? formatNationalId(
                        row.row.original.defendants[0].nationalId,
                      )
                    : '-'
                }`}
              </Text>
            ) : (
              <Text as="span" variant="small" color="dark400">
                {`+ ${row.row.original.defendants.length - 1}`}
              </Text>
            )}
          </>
        ) : (
          <Text>-</Text>
        )
      },
    },

    {
      Header: formatMessage(requests.sections.pastRequests.table.headers.type),
      accessor: 'type' as keyof Case,
      Cell: (row: {
        row: {
          original: {
            type: CaseType
            decision: CaseDecision
            parentCase: Case
          }
        }
      }) => {
        const thisRow = row.row.original

        return (
          <>
            <Box component="span" display="block">
              {thisRow.decision ===
              CaseDecision.ACCEPTING_ALTERNATIVE_TRAVEL_BAN
                ? capitalize(caseTypes['TRAVEL_BAN'])
                : capitalize(caseTypes[thisRow.type])}
            </Box>
            {row.row.original.parentCase && (
              <Text as="span" variant="small">
                Framlenging
              </Text>
            )}
          </>
        )
      },
    },

    {
      Header: formatMessage(requests.sections.pastRequests.table.headers.state),
      accessor: 'state' as keyof Case,
      disableSortBy: true,
      Cell: (row: {
        row: {
          original: {
            state: CaseState
            isValidToDateInThePast: boolean
            type: CaseType
          }
        }
      }) => {
        const tagVariant = mapCaseStateToTagVariant(
          row.row.original.state,
          isCourtRole,
          isInvestigationCase(row.row.original.type),
          row.row.original.isValidToDateInThePast,
        )

        return (
          <Tag variant={tagVariant.color} outlined disabled>
            {tagVariant.text}
          </Tag>
        )
      },
    },
    {
      Header: formatMessage(
        requests.sections.pastRequests.table.headers.duration,
      ),
      accessor: 'rulingDate' as keyof Case,
      disableSortBy: true,
      Cell: (row: {
        row: {
          original: {
            initialRulingDate: string
            rulingDate: string
            validToDate: string
            courtEndTime: string
            state: CaseState
          }
        }
      }) => {
        const initialRulingDate = row.row.original.initialRulingDate
        const rulingDate = row.row.original.rulingDate
        const validToDate = row.row.original.validToDate
        const courtEndDate = row.row.original.courtEndTime
        const state = row.row.original.state

        if (
          [CaseState.REJECTED, CaseState.DISMISSED].includes(state) ||
          !validToDate
        ) {
          return null
        } else if (initialRulingDate) {
          return `${formatDate(
            parseISO(initialRulingDate),
            'd.M.y',
          )} - ${formatDate(parseISO(validToDate), 'd.M.y')}`
        } else if (rulingDate) {
          return `${formatDate(parseISO(rulingDate), 'd.M.y')} - ${formatDate(
            parseISO(validToDate),
            'd.M.y',
          )}`
        } else if (courtEndDate) {
          return `${formatDate(parseISO(courtEndDate), 'd.M.y')} - ${formatDate(
            parseISO(validToDate),
            'd.M.y',
          )}`
        } else {
          return formatDate(parseISO(validToDate), 'd.M.y')
        }
      },
    },
  ]

  const highCourtPrColumns = {
    Header: 'Kært',
    accessor: 'accusedAppeal' as keyof Case,
    disableSortBy: true,
    Cell: (row: {
      row: {
        original: {
          prosecutorAppealDecision: CaseAppealDecision
          accusedAppealDecision: CaseAppealDecision
          prosecutorPostponedAppealDate: string
          accusedPostponedAppealDate: string
          rulingDate: string
        }
      }
    }) => {
      const prosecutorAppealDecision = row.row.original.prosecutorAppealDecision
      const accusedAppealDecision = row.row.original.accusedAppealDecision

      const prosecutorPostponedAppealDate =
        row.row.original.prosecutorPostponedAppealDate
      const accusedPostponedAppealDate =
        row.row.original.accusedPostponedAppealDate
      const rulingDate = row.row.original.rulingDate

      return formatDate(
        getAppealDate(
          prosecutorAppealDecision,
          accusedAppealDecision,
          prosecutorPostponedAppealDate,
          accusedPostponedAppealDate,
          rulingDate,
        ),
        'd.M.y',
      )
    },
  }

  const pastRequestsColumns = useMemo(
    () =>
      isHighCourtUser
        ? [...prColumns.slice(0, -1), { ...highCourtPrColumns }]
        : prColumns,
    [isCourtRole, isHighCourtUser, highCourtPrColumns, prColumns],
  )

  const pastRequestsData = useMemo(() => cases, [cases])

  return (
    <Table
      columns={pastRequestsColumns}
      data={pastRequestsData ?? []}
      handleRowClick={onRowClick}
      className={styles.table}
      sortableColumnIds={sortableColumnIds}
    />
  )
}

export default PastRequests
