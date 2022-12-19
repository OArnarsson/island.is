import compareAsc from 'date-fns/compareAsc'

import { formatDate } from '@island.is/judicial-system/formatters'
import * as constants from '@island.is/judicial-system/consts'
import type { Case, UpdateCase } from '@island.is/judicial-system/types'

import { padTimeWithZero, parseTime, replaceTabs } from './formatters'
import * as validations from './validate'

export const removeTabsValidateAndSet = (
  field: keyof UpdateCase,
  value: string,
  validations: validations.Validation[],
  theCase: Case,
  setCase: (value: React.SetStateAction<Case>) => void,
  errorMessage?: string,
  setErrorMessage?: (value: React.SetStateAction<string>) => void,
) => {
  if (value.includes('\t')) {
    value = replaceTabs(value)
  }

  validateAndSet(
    field,
    value,
    validations,
    theCase,
    setCase,
    errorMessage,
    setErrorMessage,
  )
}

export const removeErrorMessageIfValid = (
  validationsToRun: validations.Validation[],
  value: string,
  errorMessage?: string,
  errorMessageSetter?: (value: React.SetStateAction<string>) => void,
) => {
  const isValid = validations.validate([[value, validationsToRun]]).isValid

  if (errorMessage !== '' && errorMessageSetter && isValid) {
    errorMessageSetter('')
  }
}

export const validateAndSetErrorMessage = (
  validationsToRun: validations.Validation[],
  value: string,
  errorMessageSetter?: (value: React.SetStateAction<string>) => void,
) => {
  const validation = validations.validate([[value, validationsToRun]])

  if (!validation.isValid && errorMessageSetter) {
    errorMessageSetter(validation.errorMessage)
    return
  }
}

export const validateAndSet = (
  field: keyof UpdateCase,
  value: string,
  validations: validations.Validation[],
  theCase: Case,
  setCase: (value: React.SetStateAction<Case>) => void,
  errorMessage?: string,
  setErrorMessage?: (value: React.SetStateAction<string>) => void,
) => {
  removeErrorMessageIfValid(validations, value, errorMessage, setErrorMessage)

  setCase({
    ...theCase,
    [field]: value,
  })
}

export const validateAndSendToServer = (
  field: keyof UpdateCase,
  value: string,
  validations: validations.Validation[],
  theCase: Case,
  updateCase: (id: string, updateCase: UpdateCase) => void,
  setErrorMessage?: (value: React.SetStateAction<string>) => void,
) => {
  validateAndSetErrorMessage(validations, value, setErrorMessage)

  if (theCase.id !== '') {
    updateCase(theCase.id, { [field]: value })
  }
}

export const validateAndSendTimeToServer = (
  field: keyof UpdateCase,
  currentValue: string | undefined,
  time: string,
  validationsToRun: validations.Validation[],
  theCase: Case,
  updateCase: (id: string, updateCase: UpdateCase) => void,
  setErrorMessage?: (value: React.SetStateAction<string>) => void,
) => {
  if (currentValue) {
    const paddedTime = padTimeWithZero(time)

    const validation = validations.validate([[paddedTime, validationsToRun]])

    if (!validation.isValid && setErrorMessage) {
      setErrorMessage(validation.errorMessage)
      return
    }

    const dateMinutes = parseTime(currentValue, paddedTime)

    if (theCase.id !== '') {
      updateCase(theCase.id, { [field]: dateMinutes })
    }
  }
}

/**If entry is included in values then it is removed
 * otherwise it is appended
 */
export function toggleInArray<T>(values: T[] | undefined, entry: T) {
  if (!values) return [entry]

  return values.includes(entry)
    ? values.filter((x) => x !== entry)
    : [...values, entry]
}

export const setCheckboxAndSendToServer = (
  field: keyof UpdateCase,
  value: string,
  theCase: Case,
  setCase: (value: React.SetStateAction<Case>) => void,
  updateCase: (id: string, updateCase: UpdateCase) => void,
) => {
  const checks = theCase[field as keyof Case]
    ? [...(theCase[field as keyof Case] as [])]
    : ([] as string[])

  if (!checks.includes(value)) {
    checks.push(value)
  } else {
    checks.splice(checks.indexOf(value), 1)
  }

  setCase({
    ...theCase,
    [field]: checks,
  })

  if (theCase.id !== '') {
    updateCase(theCase.id, { [field]: checks })
  }
}

export const getTimeFromDate = (date: string | undefined) => {
  return date?.includes('T')
    ? formatDate(date, constants.TIME_FORMAT)
    : undefined
}

export const hasDateChanged = (
  currentDate: string | null | undefined,
  newDate: Date | undefined,
) => {
  if (!currentDate && newDate) return true

  if (currentDate && newDate) {
    return compareAsc(newDate, new Date(currentDate)) !== 0
  }
  return false
}

export type stepValidationsType = {
  [constants.CREATE_RESTRICTION_CASE_ROUTE]: (theCase: Case) => boolean
  [constants.CREATE_TRAVEL_BAN_ROUTE]: (theCase: Case) => boolean
  [constants.RESTRICTION_CASE_DEFENDANT_ROUTE]: (theCase: Case) => boolean
  [constants.RESTRICTION_CASE_HEARING_ARRANGEMENTS_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.RESTRICTION_CASE_POLICE_DEMANDS_ROUTE]: (theCase: Case) => boolean
  [constants.RESTRICTION_CASE_POLICE_REPORT_ROUTE]: (theCase: Case) => boolean
  [constants.RESTRICTION_CASE_CASE_FILES_ROUTE]: () => boolean
  [constants.RESTRICTION_CASE_OVERVIEW_ROUTE]: () => boolean
  [constants.CREATE_INVESTIGATION_CASE_ROUTE]: (theCase: Case) => boolean
  [constants.INVESTIGATION_CASE_DEFENDANT_ROUTE]: (theCase: Case) => boolean
  [constants.INVESTIGATION_CASE_HEARING_ARRANGEMENTS_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INVESTIGATION_CASE_POLICE_DEMANDS_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INVESTIGATION_CASE_POLICE_REPORT_ROUTE]: (theCase: Case) => boolean
  [constants.INVESTIGATION_CASE_CASE_FILES_ROUTE]: () => boolean
  [constants.INDICTMENTS_DEFENDANT_ROUTE]: (theCase: Case) => boolean
  [constants.INDICTMENTS_POLICE_CASE_FILES_ROUTE]: () => boolean
  [constants.INVESTIGATION_CASE_POLICE_CONFIRMATION_ROUTE]: () => boolean
  [constants.INDICTMENTS_CASE_FILE_ROUTE]: () => boolean
  [constants.INDICTMENTS_PROCESSING_ROUTE]: (theCase: Case) => boolean
  [constants.INDICTMENTS_CASE_FILES_ROUTE]: () => boolean
  [constants.RESTRICTION_CASE_RECEPTION_AND_ASSIGNMENT_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.RESTRICTION_CASE_COURT_OVERVIEW_ROUTE]: () => boolean
  [constants.RESTRICTION_CASE_COURT_HEARING_ARRANGEMENTS_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.RESTRICTION_CASE_RULING_ROUTE]: (theCase: Case) => boolean
  [constants.RESTRICTION_CASE_COURT_RECORD_ROUTE]: (theCase: Case) => boolean
  [constants.RESTRICTION_CASE_CONFIRMATION_ROUTE]: () => boolean
  [constants.INDICTMENTS_RECEPTION_AND_ASSIGNMENT_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INVESTIGATION_CASE_RECEPTION_AND_ASSIGNMENT_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INVESTIGATION_CASE_OVERVIEW_ROUTE]: () => boolean
  [constants.INVESTIGATION_CASE_COURT_HEARING_ARRANGEMENTS_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INVESTIGATION_CASE_RULING_ROUTE]: (theCase: Case) => boolean
  [constants.INVESTIGATION_CASE_COURT_RECORD_ROUTE]: (theCase: Case) => boolean
  [constants.INVESTIGATION_CASE_CONFIRMATION_ROUTE]: () => boolean
  [constants.INDICTMENTS_OVERVIEW_ROUTE]: () => boolean
  [constants.INDICTMENTS_RECEPTION_AND_ASSIGNMENT_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INDICTMENTS_SUBPOENA_ROUTE]: (theCase: Case) => boolean
  [constants.INDICTMENTS_PROSECUTOR_AND_DEFENDER_ROUTE]: (
    theCase: Case,
  ) => boolean
  [constants.INDICTMENTS_COURT_RECORD_ROUTE]: () => boolean
  [constants.CLOSED_INDICTMENT_OVERVIEW_ROUTE]: () => boolean
}

export const stepValidations = (): stepValidationsType => {
  return {
    [constants.CREATE_RESTRICTION_CASE_ROUTE]: (theCase: Case) =>
      validations.isDefendantStepValidRC(theCase, theCase.policeCaseNumbers),
    [constants.CREATE_TRAVEL_BAN_ROUTE]: (theCase: Case) =>
      validations.isDefendantStepValidRC(theCase, theCase.policeCaseNumbers),
    [constants.RESTRICTION_CASE_DEFENDANT_ROUTE]: (theCase: Case) =>
      validations.isDefendantStepValidRC(theCase, theCase.policeCaseNumbers),
    [constants.RESTRICTION_CASE_HEARING_ARRANGEMENTS_ROUTE]: (theCase: Case) =>
      validations.isHearingArrangementsStepValidRC(theCase),
    [constants.RESTRICTION_CASE_POLICE_DEMANDS_ROUTE]: (theCase: Case) =>
      validations.isPoliceDemandsStepValidRC(theCase),
    [constants.RESTRICTION_CASE_POLICE_REPORT_ROUTE]: (theCase: Case) =>
      validations.isPoliceReportStepValidRC(theCase),
    [constants.RESTRICTION_CASE_CASE_FILES_ROUTE]: () => true,
    [constants.RESTRICTION_CASE_OVERVIEW_ROUTE]: () => true,
    [constants.CREATE_INVESTIGATION_CASE_ROUTE]: (theCase: Case) =>
      validations.isDefendantStepValidIC(
        theCase,
        theCase.type,
        theCase.policeCaseNumbers,
      ),
    [constants.INVESTIGATION_CASE_DEFENDANT_ROUTE]: (theCase: Case) =>
      validations.isDefendantStepValidIC(
        theCase,
        theCase.type,
        theCase.policeCaseNumbers,
      ),
    [constants.INVESTIGATION_CASE_HEARING_ARRANGEMENTS_ROUTE]: (
      theCase: Case,
    ) => validations.isHearingArrangementsStepValidIC(theCase),
    [constants.INVESTIGATION_CASE_POLICE_DEMANDS_ROUTE]: (theCase: Case) =>
      validations.isPoliceDemandsStepValidIC(theCase),
    [constants.INVESTIGATION_CASE_POLICE_REPORT_ROUTE]: (theCase: Case) =>
      validations.isPoliceReportStepValidIC(theCase),
    [constants.INVESTIGATION_CASE_CASE_FILES_ROUTE]: () => true,
    [constants.INVESTIGATION_CASE_POLICE_CONFIRMATION_ROUTE]: () => true,
    [constants.INDICTMENTS_DEFENDANT_ROUTE]: (theCase: Case) =>
      validations.isDefendantStepValidIndictments(theCase),
    [constants.INDICTMENTS_POLICE_CASE_FILES_ROUTE]: () => true,
    [constants.INDICTMENTS_CASE_FILE_ROUTE]: () => true,
    [constants.INDICTMENTS_PROCESSING_ROUTE]: (theCase: Case) =>
      validations.isProcessingStepValidIndictments(theCase),
    [constants.INDICTMENTS_CASE_FILES_ROUTE]: () => true,
    [constants.RESTRICTION_CASE_RECEPTION_AND_ASSIGNMENT_ROUTE]: (
      theCase: Case,
    ) => validations.isReceptionAndAssignmentStepValid(theCase),
    [constants.RESTRICTION_CASE_COURT_OVERVIEW_ROUTE]: () => true,
    [constants.RESTRICTION_CASE_COURT_HEARING_ARRANGEMENTS_ROUTE]: (
      theCase: Case,
    ) => validations.isCourtHearingArrangemenstStepValidRC(theCase),
    [constants.RESTRICTION_CASE_RULING_ROUTE]: (theCase: Case) =>
      validations.isRulingValidRC(theCase),
    [constants.RESTRICTION_CASE_COURT_RECORD_ROUTE]: (theCase: Case) =>
      validations.isCourtRecordStepValidRC(theCase),
    [constants.RESTRICTION_CASE_CONFIRMATION_ROUTE]: () => true,
    [constants.INDICTMENTS_RECEPTION_AND_ASSIGNMENT_ROUTE]: (theCase: Case) =>
      validations.isReceptionAndAssignmentStepValid(theCase),
    [constants.INVESTIGATION_CASE_RECEPTION_AND_ASSIGNMENT_ROUTE]: (
      theCase: Case,
    ) => validations.isReceptionAndAssignmentStepValid(theCase),
    [constants.INVESTIGATION_CASE_OVERVIEW_ROUTE]: () => true,
    [constants.INVESTIGATION_CASE_COURT_HEARING_ARRANGEMENTS_ROUTE]: (
      theCase: Case,
    ) => validations.isCourtHearingArrangementsStepValidIC(theCase),
    [constants.INVESTIGATION_CASE_RULING_ROUTE]: (theCase: Case) =>
      validations.isRulingValidIC(theCase),
    [constants.INVESTIGATION_CASE_COURT_RECORD_ROUTE]: (theCase: Case) =>
      validations.isCourtRecordStepValidIC(theCase),
    [constants.INVESTIGATION_CASE_CONFIRMATION_ROUTE]: () => true,
    [constants.INDICTMENTS_OVERVIEW_ROUTE]: () => true,
    [constants.INDICTMENTS_RECEPTION_AND_ASSIGNMENT_ROUTE]: (theCase: Case) =>
      validations.isReceptionAndAssignmentStepValid(theCase),
    [constants.INDICTMENTS_SUBPOENA_ROUTE]: (theCase: Case) =>
      validations.isSubpoenaStepValid(theCase),
    [constants.INDICTMENTS_PROSECUTOR_AND_DEFENDER_ROUTE]: (theCase: Case) =>
      validations.isProsecutorAndDefenderStepValid(theCase),
    [constants.INDICTMENTS_COURT_RECORD_ROUTE]: () => true,
    [constants.CLOSED_INDICTMENT_OVERVIEW_ROUTE]: () => true,
  }
}

export const findFirstInvalidStep = (steps: string[], theCase: Case) => {
  const validations = stepValidations()
  const validationFunctions = Object.entries(validations)
  const stepsToCheck = validationFunctions.filter(([key]) =>
    steps.includes(key),
  )

  if (
    stepsToCheck.every(([, validationFn]) => validationFn(theCase) === true)
  ) {
    return steps[steps.length - 1]
  }

  const [key] =
    stepsToCheck.find(([, validationFn]) => validationFn(theCase) === false) ||
    []

  return key
}
