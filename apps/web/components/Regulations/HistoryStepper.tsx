import * as s from './RegulationDisplay.treat'

import React, { memo, useMemo } from 'react'
import { Icon, Link } from '@island.is/island-ui/core'
import { toISODate } from '@island.is/regulations'
import { RegulationMaybeDiff } from '@island.is/regulations/web'
import { RegulationPageTexts } from './RegulationTexts.types'
import { useRegulationLinkResolver } from './regulationUtils'
import { useNamespaceStrict as useNamespace } from '@island.is/web/hooks'

const useStepperState = (regulation: RegulationMaybeDiff) =>
  useMemo(() => {
    const { showingDiff, timelineDate } = regulation

    const changes = regulation.history.filter(
      ({ effect }) => effect !== 'repeal',
    )

    const numChanges = changes.length

    if (!numChanges) {
      return { numChanges }
    }

    const currentPos = timelineDate
      ? changes.findIndex(({ date }) => date === timelineDate)
      : numChanges - 1

    const nextDate = changes[currentPos + 1]?.date
    const previousDate =
      currentPos === 0 ? ('original' as const) : changes[currentPos - 1]?.date

    return {
      numChanges,
      nextDate,
      previousDate,
    }
  }, [regulation])

// ---------------------------------------------------------------------------

export type HistoryStepperProps = {
  regulation: RegulationMaybeDiff
  texts: RegulationPageTexts
}

export const HistoryStepper = memo((props: HistoryStepperProps) => {
  const txt = useNamespace(props.texts)
  const { linkToRegulation } = useRegulationLinkResolver()

  const { numChanges, nextDate, previousDate } = useStepperState(
    props.regulation,
  )
  const { name, showingDiff } = props.regulation

  if (!numChanges) {
    return null
  }

  return (
    <div className={s.historyStepper}>
      {nextDate && (
        <Link
          href={linkToRegulation(name, {
            diff: !!showingDiff,
            d: nextDate,
          })}
          className={s.historyStepperLink}
          color="blue400"
          underline="small"
        >
          <span className={s.historyStepperLinkText}>{txt('nextVersion')}</span>{' '}
          <Icon icon="arrowForward" size="small" />
        </Link>
      )}
      {'  '}
      {previousDate && (
        <Link
          href={linkToRegulation(name, {
            diff: !!showingDiff,
            ...(previousDate === 'original'
              ? { original: true }
              : { d: previousDate }),
          })}
          color="blue400"
          className={s.historyStepperLink}
          underline="small"
        >
          <Icon icon="arrowBack" size="small" />{' '}
          <span className={s.historyStepperLinkText}>
            {txt('previousVersion')}
          </span>
        </Link>
      )}
    </div>
  )
})
