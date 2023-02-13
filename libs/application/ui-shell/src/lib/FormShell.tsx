import React, { FC, useEffect, useReducer, useState } from 'react'
import cn from 'classnames'

import {
  Application,
  Form,
  FormModes,
  Schema,
} from '@island.is/application/types'
import {
  Box,
  GridColumn,
  GridContainer,
  GridRow,
} from '@island.is/island-ui/core'

import Screen from '../components/Screen'
import FormStepper from '../components/FormStepper'
import {
  ApplicationReducer,
  initializeReducer,
} from '../reducer/ApplicationFormReducer'
import { ActionTypes } from '../reducer/ReducerTypes'
import { useHistorySync } from '../hooks/useHistorySync'
import { useApplicationTitle } from '../hooks/useApplicationTitle'
import { useHeaderInfo } from '../context/HeaderInfoProvider'
import * as styles from './FormShell.css'
import { ErrorShell } from '../components/ErrorShell'
import { m } from './messages'

export const FormShell: FC<{
  application: Application
  nationalRegistryId: string
  form: Form
  dataSchema: Schema
}> = ({ application, nationalRegistryId, form, dataSchema }) => {
  const [updateForbidden, setUpdateForbidden] = useState(false)
  const { setInfo } = useHeaderInfo()
  const [state, dispatch] = useReducer(
    ApplicationReducer,
    {
      application,
      nationalRegistryId,
      dataSchema,
      form,
      activeScreen: 0,
      screens: [],
      sections: [],
      historyReason: 'initial',
    },
    initializeReducer,
  )
  const {
    activeScreen,
    application: storedApplication,
    sections,
    screens,
  } = state
  const {
    mode = FormModes.DRAFT,
    renderLastScreenButton,
    renderLastScreenBackButton,
  } = state.form
  const showProgressTag = mode !== FormModes.DRAFT
  const currentScreen = screens[activeScreen]
  const FormLogo = form.logo

  useHistorySync(state, dispatch)
  useApplicationTitle(state)

  useEffect(() => {
    setInfo({
      applicationName: application.name,
      institutionName: application?.institution,
    })
  }, [setInfo, application])

  if (updateForbidden) {
    return <ErrorShell errorType="lost" applicationType={application.typeId} />
  }

  return (
    <Box className={styles.root}>
      <Box
        paddingTop={[0, 4]}
        paddingBottom={[0, 5]}
        width="full"
        height="full"
      >
        <GridContainer>
          <GridRow>
            <GridColumn
              span={['12/12', '12/12', '9/12', '9/12']}
              className={styles.shellContainer}
            >
              <Box
                paddingTop={[3, 6, 10]}
                height="full"
                borderRadius="large"
                background="white"
              >
                <Screen
                  setUpdateForbidden={setUpdateForbidden}
                  application={storedApplication}
                  addExternalData={(payload) =>
                    dispatch({ type: ActionTypes.ADD_EXTERNAL_DATA, payload })
                  }
                  answerQuestions={(payload) =>
                    dispatch({ type: ActionTypes.ANSWER, payload })
                  }
                  dataSchema={dataSchema}
                  expandRepeater={() =>
                    dispatch({ type: ActionTypes.EXPAND_REPEATER })
                  }
                  answerAndGoToNextScreen={(payload) =>
                    dispatch({
                      type: ActionTypes.ANSWER_AND_GO_NEXT_SCREEN,
                      payload,
                    })
                  }
                  goToScreen={(payload: string) => {
                    dispatch({
                      type: ActionTypes.GO_TO_SCREEN,
                      payload,
                    })
                  }}
                  prevScreen={() => dispatch({ type: ActionTypes.PREV_SCREEN })}
                  activeScreenIndex={activeScreen}
                  numberOfScreens={screens.length}
                  renderLastScreenButton={renderLastScreenButton}
                  renderLastScreenBackButton={renderLastScreenBackButton}
                  screen={currentScreen}
                  mode={mode}
                />
              </Box>
            </GridColumn>
            <GridColumn
              span={['12/12', '12/12', '3/12', '3/12']}
              className={styles.sidebarContainer}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="spaceBetween"
                height="full"
                paddingTop={[0, 0, 8]}
                paddingLeft={[0, 0, 0, 4]}
                className={styles.sidebarInner}
              >
                <FormStepper
                  application={storedApplication}
                  mode={mode}
                  showTag={showProgressTag}
                  form={form}
                  sections={sections}
                  screen={currentScreen}
                />
                {FormLogo && (
                  <Box
                    display={['none', 'none', 'flex']}
                    alignItems="center"
                    justifyContent="center"
                    marginRight={[0, 0, 0, 4]}
                    paddingBottom={4}
                  >
                    <FormLogo />
                  </Box>
                )}
              </Box>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </Box>
    </Box>
  )
}
