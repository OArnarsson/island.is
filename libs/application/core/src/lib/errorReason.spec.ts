import {
  getErrorReasonIfPresent,
  isProviderErrorReason,
  isTranslationObject,
} from './errorReasonUtils'
import { coreErrorMessages } from './messages'
import {
  Application,
  ApplicationStatus,
  ApplicationTypes,
} from '@island.is/application/types'

const application: Application = {
  id: '123',
  assignees: [],
  state: 'draft',
  applicant: '111111-3000',
  applicantActors: [],
  typeId: ApplicationTypes.EXAMPLE,
  modified: new Date(),
  created: new Date(),
  answers: {},
  externalData: {},
  status: ApplicationStatus.IN_PROGRESS,
}

describe('dataProviderUtils', () => {
  it('Should not fail when providing custom error message with various test inputs for the error reason', async () => {
    expect(isTranslationObject('test')).toBe(false)
    const mockErrorReason = {
      title: 'title',
      summary: 'summary',
    }
    expect(isProviderErrorReason(mockErrorReason)).toBe(true)

    expect(getErrorReasonIfPresent(mockErrorReason)).toEqual({
      title: 'title',
      summary: 'summary',
    })

    const mockErrorReasonWithTranslationString = {
      title: coreErrorMessages.fileRemove,
      summary: coreErrorMessages.fileUpload,
    }

    expect(
      getErrorReasonIfPresent(mockErrorReasonWithTranslationString),
    ).toEqual({
      title: coreErrorMessages.fileRemove,
      summary: coreErrorMessages.fileUpload,
    })

    const mockErrorReasonStringOnly = 'someError'

    expect(isProviderErrorReason(mockErrorReasonStringOnly)).toBe(false)

    expect(getErrorReasonIfPresent(mockErrorReasonStringOnly)).toEqual({
      title: coreErrorMessages.failedDataProviderSubmit,
      summary: 'someError',
    })

    const mockErrorReasonTranslationOnly = coreErrorMessages.fileUpload

    expect(isProviderErrorReason(mockErrorReasonTranslationOnly)).toBe(false)

    expect(getErrorReasonIfPresent(mockErrorReasonTranslationOnly)).toEqual({
      title: coreErrorMessages.failedDataProviderSubmit,
      summary: coreErrorMessages.fileUpload,
    })

    expect(getErrorReasonIfPresent(undefined)).toEqual({
      title: coreErrorMessages.errorDataProvider,
      summary: coreErrorMessages.failedDataProvider,
    })
  })
})
