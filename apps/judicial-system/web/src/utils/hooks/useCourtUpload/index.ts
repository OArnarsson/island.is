import { useCallback, useEffect, useState } from 'react'
import { ApolloError, useMutation } from '@apollo/client'

import { UploadFileToCourtMutation } from '@island.is/judicial-system-web/graphql'
import {
  CaseFile as TCaseFile,
  CaseFileState,
} from '@island.is/judicial-system/types'
import { TempCase as Case } from '@island.is/judicial-system-web/src/types'

export enum UploadState {
  ALL_UPLOADED = 'ALL_UPLOADED',
  ALL_UPLOADED_NONE_AVAILABLE = 'ALL_UPLOADED_NONE_AVAILABLE',
  NONE_AVAILABLE = 'NONE_AVAILABLE',
  NONE_CAN_BE_UPLOADED = 'NONE_CAN_BE_UPLOADED',
  SOME_NOT_UPLOADED = 'SOME_NOT_UPLOADED',
  UPLOAD_ERROR = 'UPLOAD_ERROR',
  UPLOADING = 'UPLOADING',
}

export type CaseFileStatus =
  | 'done'
  | 'done-broken'
  | 'not-uploaded'
  | 'broken'
  | 'uploading'
  | 'error'
  | 'case-not-found'
  | 'unsupported'

export interface CaseFile extends TCaseFile {
  status: CaseFileStatus
}

export const useCourtUpload = (
  workingCase: Case,
  setWorkingCase: React.Dispatch<React.SetStateAction<Case>>,
) => {
  const [uploadState, setUploadState] = useState<UploadState>()
  const [uploadFileToCourtMutation] = useMutation(UploadFileToCourtMutation)

  const setFileUploadStatus = useCallback(
    (theCase: Case, file: CaseFile, status: CaseFileStatus) => {
      const files = theCase.caseFiles as CaseFile[]

      if (files) {
        const fileIndexToUpdate = files.findIndex((f) => f.id === file.id)
        files[fileIndexToUpdate] = {
          ...file,
          status,
        }

        setWorkingCase({ ...theCase })
      }
    },
    [setWorkingCase],
  )

  useEffect(() => {
    const files = workingCase.caseFiles as CaseFile[]

    files
      ?.filter((file) => !file.status)
      .forEach((file) => {
        if (file.state === CaseFileState.STORED_IN_COURT) {
          if (file.key) {
            setFileUploadStatus(workingCase, file, 'done')
          } else {
            setFileUploadStatus(workingCase, file, 'done-broken')
          }
        } else if (file.state === CaseFileState.STORED_IN_RVG) {
          if (file.key) {
            setFileUploadStatus(workingCase, file, 'not-uploaded')
          } else {
            setFileUploadStatus(workingCase, file, 'broken')
          }
        }
      })

    setUploadState(
      files?.some((file) => file.status === 'uploading')
        ? UploadState.UPLOADING
        : files?.some((file) => file.status === 'error')
        ? UploadState.UPLOAD_ERROR
        : files?.some((file) => file.status === 'not-uploaded')
        ? UploadState.SOME_NOT_UPLOADED
        : files?.every((file) => file.status === 'done-broken')
        ? UploadState.ALL_UPLOADED_NONE_AVAILABLE
        : files?.every(
            (file) => file.status === 'done' || file.status === 'done-broken',
          )
        ? UploadState.ALL_UPLOADED
        : files?.every(
            (file) => file.status === 'broken' || file.status === 'done-broken',
          )
        ? UploadState.NONE_AVAILABLE
        : UploadState.NONE_CAN_BE_UPLOADED,
    )
  }, [setFileUploadStatus, workingCase])

  const uploadFilesToCourt = async (files?: TCaseFile[]) => {
    if (files) {
      const xFiles = files as CaseFile[]
      xFiles.forEach(async (file) => {
        try {
          if (file.state === CaseFileState.STORED_IN_RVG && file.key) {
            setFileUploadStatus(workingCase, file, 'uploading')

            await uploadFileToCourtMutation({
              variables: {
                input: {
                  id: file.id,
                  caseId: workingCase.id,
                },
              },
            })

            setFileUploadStatus(
              workingCase,
              { ...file, state: CaseFileState.STORED_IN_COURT },
              'done',
            )
          }
        } catch (error) {
          const { errorCode, detail } = {
            errorCode:
              error instanceof ApolloError &&
              (error as ApolloError).graphQLErrors[0].extensions?.code,
            detail:
              (error instanceof ApolloError &&
                ((error as ApolloError).graphQLErrors[0].extensions
                  ?.problem as { detail: string })?.detail) ||
              '',
          }

          if (errorCode === 'https://httpstatuses.org/404') {
            if (detail?.startsWith('Case Not Found')) {
              setFileUploadStatus(workingCase, file, 'case-not-found')
            } else {
              setFileUploadStatus(
                workingCase,
                { ...file, key: undefined },
                'broken',
              )
            }
          } else if (
            errorCode === 'https://httpstatuses.org/415' // Unsupported Media Type
          ) {
            setFileUploadStatus(workingCase, file, 'unsupported')
          } else {
            setFileUploadStatus(workingCase, file, 'error')
          }
        }
      })
    }
  }

  return {
    uploadFilesToCourt,
    uploadState,
  }
}
