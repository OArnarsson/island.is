import * as s from './ButtonBar.css'

import React from 'react'
import { Box, Button } from '@island.is/island-ui/core'
import { buttonsMsgs as msg } from '../messages'
import { useLocale } from '../utils'
import { useDraftingState } from '../state/useDraftingState'
// import { SaveDeleteButtons } from './SaveDeleteButtons'

export const ButtonBar = () => {
  const { step, actions } = useDraftingState()
  const t = useLocale().formatMessage

  return (
    <Box className={s.wrapper} marginTop={[4, 4, 6]} paddingTop={3}>
      {actions.goForward && (
        <Box className={s.forward}>
          <Button
            onClick={actions.goForward}
            icon="arrowForward"
            iconType="outline"
          >
            {t(step.next === 'review' ? msg.prepShipping : msg.continue)}
          </Button>
        </Box>
      )}

      {actions.goBack && (
        <Box className={s.back}>
          <Button
            onClick={actions.goBack}
            preTextIcon="arrowBack"
            preTextIconType="outline"
            colorScheme="light"
          >
            {t(msg.goBack)}
          </Button>
        </Box>
      )}

      {actions.propose && (
        <Box className={s.propose}>
          <Button
            onClick={actions.propose}
            preTextIcon="share"
            preTextIconType="outline"
          >
            {t(msg.propose)}
          </Button>
        </Box>
      )}
    </Box>
  )
}
