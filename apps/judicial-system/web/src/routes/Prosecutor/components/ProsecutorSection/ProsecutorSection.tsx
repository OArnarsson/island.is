import React, { useContext } from 'react'

import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'
import { Box } from '@island.is/island-ui/core'
import {
  FormContext,
  ProsecutorSelection,
} from '@island.is/judicial-system-web/src/components'
import { isIndictmentCase } from '@island.is/judicial-system/types'

import ProsecutorSectionHeading from './ProsecutorSectionHeading'

const ProsecutorSection: React.FC = () => {
  const { workingCase, setWorkingCase } = useContext(FormContext)
  const { setAndSendCaseToServer } = useCase()

  const handleProsecutorChange = (prosecutorId: string) => {
    setAndSendCaseToServer(
      [
        {
          prosecutorId: prosecutorId,
          force: true,
        },
      ],
      workingCase,
      setWorkingCase,
    )

    return true
  }

  return (
    <Box component="section" marginBottom={5}>
      <ProsecutorSectionHeading
        isIndictment={isIndictmentCase(workingCase.type)}
      />
      <ProsecutorSelection onChange={handleProsecutorChange} />
    </Box>
  )
}

export default ProsecutorSection
