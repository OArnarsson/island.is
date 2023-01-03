import { Box, LoadingDots } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { m } from '../../lib/messages'
import * as styles from './LoadingScreen.css'

interface LoadingScreenProps {
  ariaLabel?: string
}

export const LoadingScreen = ({ ariaLabel }: LoadingScreenProps) => {
  const { formatMessage } = useLocale()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={styles.fullScreen}
      role="progressbar"
      aria-valuetext={ariaLabel ?? formatMessage(m.loadingScreen)}
    >
      <LoadingDots large />
    </Box>
  )
}