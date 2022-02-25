import * as s from './Home.css'

import React from 'react'

import {
  Box,
  Button,
  Text,
  Tabs,
  GridColumn,
  GridRow,
} from '@island.is/island-ui/core'
import { useNamespaces } from '@island.is/localization'
import { TaskList } from '../components/TaskList'
import { ShippedRegulations } from '../components/ShippedRegulations'
import { homeMessages as msg } from '../messages'
import { useLocale } from '@island.is/localization'
import { useCreateRegulationDraft } from '../utils/dataHooks'
import { RegulationsTabs } from '../components/RegulationsTabs'

const Home = () => {
  useNamespaces('ap.regulations-admin')

  const t = useLocale().formatMessage
  const { createNewDraft, creating } = useCreateRegulationDraft()

  return (
    <Box marginBottom={[6, 6, 10]}>
      <GridRow>
        <Text as="h1" variant="h1">
          {t(msg.title)}
        </Text>
      </GridRow>
      <GridRow>
        <GridColumn span={['12/12', '12/12', '12/12', '8/12']}>
          <Box marginBottom={[4, 4, 8]}>
            {msg.intro && (
              <Text as="p" marginTop={1}>
                {t(msg.intro)}
              </Text>
            )}
          </Box>
        </GridColumn>
        <GridColumn span={['12/12', '12/12', '12/12', '4/12']}>
          {/* <IntroHeader title={msg.title} intro={msg.intro} /> */}
          <Box
            marginBottom={3}
            marginLeft={[0, 0, 2]}
            display="flex"
            justifyContent={['flexStart', 'flexStart', 'flexEnd']}
            alignItems="center"
          >
            <Button
              colorScheme="default"
              iconType="filled"
              preTextIconType="filled"
              size="small"
              variant="primary"
              disabled={creating}
              onClick={() => createNewDraft()}
            >
              {t(msg.createRegulation)}
            </Button>
          </Box>
        </GridColumn>
      </GridRow>
      <RegulationsTabs />
    </Box>
  )
}

export default Home
