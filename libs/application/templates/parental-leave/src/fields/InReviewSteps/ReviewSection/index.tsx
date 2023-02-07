import React, { FC } from 'react'
import cn from 'classnames'
import { useLocale } from '@island.is/localization'
import { formatText, coreMessages } from '@island.is/application/core'
import { Application } from '@island.is/application/types'
import { Box, Button, Icon, Link, Tag, Text } from '@island.is/island-ui/core'
import { parentalLeaveFormMessages } from '../../../lib/messages'

import * as styles from './ReviewSection.css'

export enum ReviewSectionState {
  prerequisites = 'Prerequisites',
  inProgress = 'In progress',
  requiresAction = 'Requires action',
  complete = 'Complete',
  optionalAction = 'Optional action',
}

type ReviewSectionProps = {
  application: Application
  index: number
  title: string
  description: string
  state?: ReviewSectionState
  notifyParentOnClickEvent?: () => void
}

const ReviewSection: FC<ReviewSectionProps> = ({
  application,
  index,
  title,
  description,
  state,
  notifyParentOnClickEvent,
}) => {
  const { formatMessage } = useLocale()

  return (
    <Box
      position="relative"
      border="standard"
      borderRadius="large"
      padding={4}
      marginBottom={2}
    >
      {/* Section Number */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        className={cn(styles.sectionNumber, {
          [styles.sectionNumberNotStarted]: state === undefined,
          [styles.sectionNumberInProgress]:
            state === ReviewSectionState.inProgress,
          [styles.sectionNumberRequiresAction]:
            state === ReviewSectionState.requiresAction,
          [styles.sectionNumberComplete]: state === ReviewSectionState.complete,
          [styles.sectionNumberOptionalAction]:
            state === ReviewSectionState.optionalAction,
          [styles.sectionNumberPrerequisites]:
            state === ReviewSectionState.prerequisites,
        })}
      >
        {(state === ReviewSectionState.complete && (
          <Icon color="white" size="small" icon="checkmark" />
        )) || <span className={styles.sectionNumberText}>{index}</span>}
      </Box>

      {/* Contents */}
      <Box
        alignItems="flexStart"
        display="flex"
        flexDirection={['columnReverse', 'row']}
        justifyContent="spaceBetween"
      >
        <Box marginTop={[1, 0, 0]} paddingRight={[0, 1, 1]} width="full">
          <Text variant="h3">{title}</Text>
          <Text marginTop={1} variant="default">
            {description}
          </Text>
          {notifyParentOnClickEvent &&
            (state === ReviewSectionState.optionalAction ||
              state === ReviewSectionState.prerequisites) && (
              <Box display={'flex'} justifyContent={'flexEnd'} marginTop={1}>
                <Box>
                  {state === ReviewSectionState.optionalAction ? (
                    <Button
                      variant="text"
                      size="small"
                      icon="arrowForward"
                      onClick={() => notifyParentOnClickEvent()}
                    >
                      {formatMessage(
                        parentalLeaveFormMessages.residenceGrantMessage
                          .residenceGrantApplyTitle,
                      )}
                    </Button>
                  ) : (
                    <Link
                      href={
                        'https://www.vinnumalastofnun.is/faedingarorlofssjodur/dvalarstyrkur'
                      }
                    >
                      <Button variant="text" size="small" icon="arrowForward">
                        {formatMessage(
                          parentalLeaveFormMessages.residenceGrantMessage
                            .residenceGrantActionLinkTitle,
                        )}
                      </Button>
                    </Link>
                  )}
                </Box>
              </Box>
            )}
        </Box>

        {state === ReviewSectionState.inProgress && (
          <Box pointerEvents="none">
            <Tag variant="blue">
              {formatText(
                coreMessages.tagsInProgress,
                application,
                formatMessage,
              )}
            </Tag>
          </Box>
        )}
        {state === ReviewSectionState.requiresAction && (
          <Box pointerEvents="none">
            <Tag variant="red">
              {formatText(
                coreMessages.tagsRequiresAction,
                application,
                formatMessage,
              )}
            </Tag>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ReviewSection
