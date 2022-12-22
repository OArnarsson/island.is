import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { PageLayout } from '@island.is/judicial-system-web/src/components'
import {
  CourtSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'
import { FormContext } from '@island.is/judicial-system-web/src/components/FormProvider/FormProvider'
import { isAcceptingCaseDecision } from '@island.is/judicial-system/types'
import { formatDate } from '@island.is/judicial-system/formatters'
import { icRuling as m } from '@island.is/judicial-system-web/messages'

import RulingForm from './RulingForm'

const Ruling = () => {
  const {
    workingCase,
    setWorkingCase,
    isLoadingWorkingCase,
    caseNotFound,
    isCaseUpToDate,
  } = useContext(FormContext)

  const { autofill } = useCase()
  const { formatMessage } = useIntl()

  useEffect(() => {
    document.title = 'Yfirlit kröfu - Réttarvörslugátt'
  }, [])

  useEffect(() => {
    if (isCaseUpToDate) {
      autofill(
        'introduction',
        formatMessage(m.sections.introduction.autofill, {
          date: formatDate(workingCase.courtDate, 'PPP'),
        }),
        workingCase,
      )

      if (workingCase.demands) {
        autofill('prosecutorDemands', workingCase.demands, workingCase)
      }

      if (workingCase.caseFacts) {
        autofill('courtCaseFacts', workingCase.caseFacts, workingCase)
      }

      if (workingCase.legalArguments) {
        autofill('courtLegalArguments', workingCase.legalArguments, workingCase)
      }
    }

    if (isAcceptingCaseDecision(workingCase.decision) && workingCase.demands) {
      autofill('conclusion', workingCase.demands, workingCase)
    }

    setWorkingCase(workingCase)
  }, [autofill, formatMessage, isCaseUpToDate, setWorkingCase, workingCase])

  return (
    <PageLayout
      workingCase={workingCase}
      activeSection={
        workingCase?.parentCase ? Sections.JUDGE_EXTENSION : Sections.JUDGE
      }
      activeSubSection={CourtSubsections.RULING}
      isLoading={isLoadingWorkingCase}
      notFound={caseNotFound}
    >
      <RulingForm
        workingCase={workingCase}
        setWorkingCase={setWorkingCase}
        isLoading={isLoadingWorkingCase}
        isCaseUpToDate={isCaseUpToDate}
      />
    </PageLayout>
  )
}

export default Ruling