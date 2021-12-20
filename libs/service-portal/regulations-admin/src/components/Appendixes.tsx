import * as s from './Appendixes.css'

import { EditorInput } from './EditorInput'
import React, { MutableRefObject, useMemo, useState } from 'react'
import { MiniDiff } from './MiniDiff'
import { editorMsgs as msg, errorMsgs } from '../messages'
import { domid, HTMLText, PlainText } from '@island.is/regulations'
import { RegulationDraft } from '@island.is/regulations/admin'
import {
  Accordion,
  AccordionItem,
  Box,
  Button,
} from '@island.is/island-ui/core'
import { MagicTextarea } from './MagicTextarea'
import { useLocale } from '../utils'

const NEW_PREFIX = 'new---'

// ---------------------------------------------------------------------------

type AppendixProps = {
  appendix: AppendixStateItem
  idx: number
  buttons: boolean
  isImpact?: boolean
} & Pick<AppendixesProps, 'onTextChange' | 'onChange' | 'draftId'>

const Appendix = (props: AppendixProps) => {
  const { appendix, idx, buttons, onChange, onTextChange } = props
  const { title, baseTitle, valueRef, baseText, elmRef } = appendix

  const t = useLocale().formatMessage

  const isRemovable = appendix.key.startsWith(NEW_PREFIX)

  const removeAppendix = (idx: number) => {
    if (!isRemovable) return
    const appendixEmpty =
      !appendix.title &&
      !appendix.valueRef
        .current()
        .trim()
        .replace(/^<[^>]+>\s+<\/[^>]+>$/, '')
    if (
      appendixEmpty ||
      // eslint-disable-next-line no-restricted-globals
      confirm(t(msg.appendix_remove_confirm, { idx: idx + 1 }))
    ) {
      onChange((appendixes) => {
        if (idx < 0 || appendixes.length <= idx) {
          return appendixes
        }
        return appendixes.slice(0, idx).concat(appendixes.slice(idx + 1))
      })
    }
  }

  const moveAppendixUp = (idx: number) => {
    onChange((appendixes) => {
      if (idx < 1 || appendixes.length <= idx) {
        return appendixes
      }
      const newList = [...appendixes]
      newList[idx] = appendixes[idx - 1]
      newList[idx - 1] = appendixes[idx]
      return newList
    })
  }

  const changeAppendixTitle = (idx: number, title: string) => {
    onChange((appendixes) => {
      const item = appendixes[idx]
      if (title === item.title) {
        return appendixes
      }
      const newList = [...appendixes]
      newList[idx] = {
        ...item,
        title,
      }
      return newList
    })
  }

  const labelShiftUp = t(msg.appendix_shiftup, { idx: idx + 1 })
  const labelRemove = t(msg.appendix_remove, { idx: idx + 1 })

  const [expanded, setExpanded] = useState(
    () => !appendix.title && !appendix.valueRef.current(),
  )

  // DECIDE: Should we disallow editing pre-existing titles? when
  // `isImpact === true`

  return (
    <AccordionItem
      id={props.draftId + '-appendix-' + idx}
      label={
        appendix.baseTitle ||
        appendix.title ||
        t(msg.appendix_legend, { idx: idx + 1 })
      }
      expanded={expanded}
      onToggle={setExpanded}
    >
      <div className={s.appendix}>
        <Box marginBottom={3}>
          <MagicTextarea
            label={t(msg.appendix_title)}
            name="title"
            value={title}
            onChange={(value) => {
              changeAppendixTitle(idx, value)
              onTextChange && onTextChange(idx)
            }}
            required
            error={'' && t(errorMsgs.fieldRequired)}
            // hasError={!!draft.title?.error}
          />
          {props.isImpact && baseTitle != null && title !== baseTitle && (
            <MiniDiff older={baseTitle || ''} newer={title} />
          )}
        </Box>

        <Box marginBottom={4}>
          <EditorInput
            label={t(msg.appendix_text)}
            baseText={baseText}
            valueRef={valueRef}
            elmRef={elmRef}
            onChange={onTextChange ? () => onTextChange(idx) : undefined}
            draftId={props.draftId}
            isImpact={props.isImpact}
          />
        </Box>

        {(buttons || isRemovable) && (
          <div className={s.appendixTools}>
            {idx > 0 && (
              <Button
                size="small"
                variant="text"
                preTextIcon="arrowUp"
                // circle
                // variant="ghost"
                // icon="arrowUp"
                onClick={() => moveAppendixUp(idx)}
                title={labelShiftUp}
              >
                {t(msg.appendix_shiftup_short)}
              </Button>
            )}{' '}
            {isRemovable && (
              <Button
                size="small"
                variant="text"
                preTextIcon="trash"
                // circle
                // variant="ghost"
                // icon="trash"
                onClick={() => removeAppendix(idx)}
                title={labelRemove}
              >
                {t(msg.appendix_remove_short)}
              </Button>
            )}
          </div>
        )}
      </div>
    </AccordionItem>
  )
}

// ===========================================================================

export type AppendixStateItem = {
  key: string
  title: PlainText
  baseTitle?: PlainText
  baseText?: HTMLText
  valueRef: MutableRefObject<() => HTMLText>
  elmRef?: MutableRefObject<HTMLElement | null>
}

type AppendixesProps = {
  draftId: RegulationDraft['id']
  appendixes: ReadonlyArray<AppendixStateItem>
  onChange: (
    reducer: (
      appendixes: ReadonlyArray<AppendixStateItem>,
    ) => ReadonlyArray<AppendixStateItem>,
  ) => void
  onTextChange?: (index: number) => void
  appendOnly?: boolean
  isImpact?: boolean
}

export const Appendixes = (props: AppendixesProps) => {
  const t = useLocale().formatMessage

  const addAppendix = () => {
    props.onChange((appendixes) => {
      const newAppendix: AppendixStateItem = {
        key: NEW_PREFIX + domid(),
        title: '',
        valueRef: { current: () => '' },
        elmRef: { current: null },
      }
      return appendixes.concat(newAppendix)
    })
  }

  return (
    <>
      {props.appendixes.length > 0 && (
        <Accordion singleExpand={false} dividerOnTop={false}>
          {props.appendixes.map((appendix, i) => (
            <Appendix
              key={appendix.key}
              appendix={appendix}
              idx={i}
              buttons={!props.appendOnly}
              onChange={props.onChange}
              onTextChange={props.onTextChange}
              draftId={props.draftId}
              isImpact={props.isImpact}
            />
          ))}
        </Accordion>
      )}{' '}
      <Box marginTop={2}>
        <Button
          variant="text"
          preTextIcon="add"
          // size="large"
          onClick={addAppendix}
        >
          {t(msg.appendix_add)}
        </Button>
      </Box>
    </>
  )
}
