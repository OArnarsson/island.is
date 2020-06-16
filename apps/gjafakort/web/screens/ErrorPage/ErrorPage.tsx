import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  ContentBlock,
  Typography,
} from '@island.is/island-ui/core'

import { useI18n } from '../../i18n'

function ErrorPage() {
  const {
    t: { error: t, routes },
  } = useI18n()

  const router = useRouter()
  const { errorType } = router.query

  let intro = t.intro
  if (errorType === 'kennitalaIsNotAPerson') {
    intro = t.introKennitalaIsNotAPerson
  } else if (errorType === 'userNotOldEnough') {
    intro = t.introUserNotOldEnough
  }

  return (
    <Box marginTop={12}>
      <ContentBlock width="large">
        <Box marginBottom={3}>
          <Typography variant="h1" as="h1">
            {t.title}
          </Typography>
        </Box>
        <Box marginBottom={9}>
          <Typography variant="intro">{intro}</Typography>
        </Box>
        <Link href={routes.home}>
          <span>
            <Button>{t.button}</Button>
          </span>
        </Link>
      </ContentBlock>
    </Box>
  )
}

export default ErrorPage
