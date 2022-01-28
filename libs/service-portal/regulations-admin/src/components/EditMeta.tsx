import React from 'react'
import {
  Box,
  Button,
  Column,
  Columns,
  DatePicker,
  Input,
} from '@island.is/island-ui/core'
import { editorMsgs as msg } from '../messages'
import { useLocale } from '../utils'
import { LawChapterSlug } from '@island.is/regulations'
import { LawChaptersSelect } from './LawChaptersSelect'
import { useDraftingState } from '../state/useDraftingState'

export const EditMeta = () => {
  const { formatMessage: t } = useLocale()
  const { draft, actions } = useDraftingState()
  const { updateState, updateLawChapterProp } = actions

  const type = draft.type
  const typeName =
    type.value &&
    t(type.value === 'amending' ? msg.type_amending : msg.type_base)

  return (
    <>
      <Columns space={3} collapseBelow="lg">
        <Column>
          <Box marginBottom={3}>
            <Input
              label={t(msg.type)}
              value={typeName || ''}
              placeholder={t(msg.typePlaceholder)}
              name="_type"
              size="sm"
              readOnly
              hasError={type.showError && !!type.error}
              errorMessage={t(type.error)}
            />
          </Box>
        </Column>

        <Column>
          <Box marginBottom={3}>
            <DatePicker
              size="sm"
              label={t(msg.effectiveDate)}
              placeholderText={t(msg.effectiveDate_default)}
              minDate={draft.idealPublishDate.value || null}
              selected={draft.effectiveDate.value}
              handleChange={(date: Date) => updateState('effectiveDate', date)}
              hasError={
                draft.effectiveDate.showError && !!draft.effectiveDate.error
              }
              errorMessage={t(draft.effectiveDate.error)}
              backgroundColor="blue"
            />
            {!!draft.effectiveDate.value && (
              <Button
                size="small"
                variant="text"
                preTextIcon="close"
                onClick={() => {
                  updateState('effectiveDate', undefined)
                }}
              >
                {t(msg.effectiveDate_default)}
              </Button>
            )}
          </Box>
        </Column>
      </Columns>

      <Box>
        <LawChaptersSelect
          activeChapters={draft.lawChapters.value}
          error={draft.lawChapters.showError && t(draft.lawChapters.error)}
          addChapter={(slug: LawChapterSlug) =>
            updateLawChapterProp('add', slug)
          }
          removeChapter={(slug: LawChapterSlug) =>
            updateLawChapterProp('delete', slug)
          }
        />
      </Box>
    </>
  )
}
