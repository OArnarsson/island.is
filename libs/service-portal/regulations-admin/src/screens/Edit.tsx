import React, { FC, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { useLocale, useNamespaces } from '@island.is/localization'
import { RegulationDraftId } from '@island.is/regulations/admin'
import { isUuid } from 'uuidv4'
import { Step } from '../types'
import { RegDraftingProvider, steps } from '../state/useDraftingState'
import { useMinistriesQuery, useRegulationDraftQuery } from '../utils/dataHooks'
import { ServicePortalModuleComponent } from '@island.is/service-portal/core'
import { MessageDescriptor } from '@formatjs/intl'
import { editorMsgs } from '../messages'
import { EditBasics } from '../components/EditBasics'
import { EditMeta } from '../components/EditMeta'
import { EditSignature } from '../components/EditSignature'
import { EditImpacts } from '../components/EditImpacts'
import { EditReview } from '../components/EditReview'
import { Box, SkeletonLoader, Text } from '@island.is/island-ui/core'
import { SaveDeleteButtons } from '../components/SaveDeleteButtons'
import { DraftingNotes } from '../components/DraftingNotes'
import { ButtonBar } from '../components/ButtonBar'

// ---------------------------------------------------------------------------

const assertStep = (maybeStep?: string): Step => {
  if (!maybeStep) {
    return 'basics'
  }
  if (maybeStep in steps) {
    return maybeStep as Step
  }
  throw new Error('Invalid RegulationDraft editing Step')
}

const assertDraftId = (maybeId: string): RegulationDraftId => {
  if (isUuid(maybeId)) {
    return maybeId as RegulationDraftId
  }
  throw new Error('Invalid RegulationDraft editing Id')
}

// ---------------------------------------------------------------------------

const stepData: Record<
  Step,
  {
    title: MessageDescriptor
    intro?: MessageDescriptor
    Component: () => ReturnType<FC>
  }
> = {
  basics: {
    title: editorMsgs.stepContentHeadline,
    Component: EditBasics,
  },
  meta: {
    title: editorMsgs.stepMetaHeadline,
    Component: EditMeta,
  },
  signature: {
    title: editorMsgs.stepSignatureHeadline,
    intro: editorMsgs.stepSignatureIntro,
    Component: EditSignature,
  },
  impacts: {
    title: editorMsgs.stepImpactHeadline,
    intro: editorMsgs.stepImpactIntro,
    Component: EditImpacts,
  },
  review: {
    title: editorMsgs.stepReviewHeadline,
    intro: editorMsgs.stepReviewIntro,
    Component: EditReview,
  },
}

// ---------------------------------------------------------------------------

const EditApp: ServicePortalModuleComponent = ({ userInfo }) => {
  useNamespaces('ap.regulations-admin')

  const params = useParams<{ id: string; step?: string }>()
  const id = assertDraftId(params.id)
  const stepName = assertStep(params.step)

  const regulationDraft = useRegulationDraftQuery(id)
  const ministries = useMinistriesQuery()
  const t = useLocale().formatMessage

  if (regulationDraft.loading || ministries.loading) {
    return <p>Loading...</p>
  }

  if (regulationDraft.error) {
    throw new Error(`Regulation ${id} not found`)
  }
  if (ministries.error) {
    throw ministries.error
  }

  const step = stepData[stepName]

  return (
    <RegDraftingProvider
      regulationDraft={regulationDraft.data}
      stepName={stepName}
      ministries={ministries.data}
      userInfo={userInfo}
    >
      <Fragment key={id}>
        <Box marginBottom={[2, 2, 4]}>
          <Text as="h1" variant="h1">
            {t(step.title)}
          </Text>
          {step.intro && (
            <Text as="p" marginTop={1}>
              {t(step.intro)}
            </Text>
          )}
        </Box>

        <SaveDeleteButtons wrap />

        {regulationDraft ? (
          <step.Component />
        ) : (
          <SkeletonLoader height={120} repeat={2} space={3} />
        )}
        <DraftingNotes />
        <ButtonBar />
      </Fragment>
    </RegDraftingProvider>
  )
}

export default EditApp
