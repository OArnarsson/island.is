import type { Defendant } from './defendant'
import type { Institution } from './institution'
import type { Notification } from './notification'
import type { CaseFile } from './file'
import type { User } from './user'
import type { CourtDocument } from './courtDocument'

export enum CaseOrigin {
  UNKNOWN = 'UNKNOWN',
  RVG = 'RVG',
  LOKE = 'LOKE',
}

export enum CaseType {
  // Indictment cases
  INDICTMENT = 'INDICTMENT',
  // Restriction Cases
  ADMISSION_TO_FACILITY = 'ADMISSION_TO_FACILITY',
  CUSTODY = 'CUSTODY',
  TRAVEL_BAN = 'TRAVEL_BAN',
  // Investigation Cases
  AUTOPSY = 'AUTOPSY',
  BANKING_SECRECY_WAIVER = 'BANKING_SECRECY_WAIVER',
  BODY_SEARCH = 'BODY_SEARCH',
  ELECTRONIC_DATA_DISCOVERY_INVESTIGATION = 'ELECTRONIC_DATA_DISCOVERY_INVESTIGATION',
  EXPULSION_FROM_HOME = 'EXPULSION_FROM_HOME',
  INTERNET_USAGE = 'INTERNET_USAGE',
  OTHER = 'OTHER',
  PHONE_TAPPING = 'PHONE_TAPPING',
  PSYCHIATRIC_EXAMINATION = 'PSYCHIATRIC_EXAMINATION',
  RESTRAINING_ORDER = 'RESTRAINING_ORDER',
  RESTRAINING_ORDER_AND_EXPULSION_FROM_HOME = 'RESTRAINING_ORDER_AND_EXPULSION_FROM_HOME',
  SEARCH_WARRANT = 'SEARCH_WARRANT',
  SOUND_RECORDING_EQUIPMENT = 'SOUND_RECORDING_EQUIPMENT',
  TELECOMMUNICATIONS = 'TELECOMMUNICATIONS',
  TRACKING_EQUIPMENT = 'TRACKING_EQUIPMENT',
  VIDEO_RECORDING_EQUIPMENT = 'VIDEO_RECORDING_EQUIPMENT',
}

export enum IndictmentSubtype {
  AGGRAVATED_ASSAULT = 'AGGRAVATED_ASSAULT',
  ALCOHOL_LAWS = 'ALCOHOL_LAWS',
  ASSAULT_LEADING_TO_DEATH = 'ASSAULT_LEADING_TO_DEATH',
  ATTEMPTED_MURDER = 'ATTEMPTED_MURDER',
  BREAKING_AND_ENTERING = 'BREAKING_AND_ENTERING',
  CHILD_PROTECTION_LAWS = 'CHILD_PROTECTION_LAWS',
  COVER_UP = 'COVER_UP',
  CUSTOMS_VIOLATION = 'CUSTOMS_VIOLATION',
  DOMESTIC_VIOLENCE = 'DOMESTIC_VIOLENCE',
  EMBEZZLEMENT = 'EMBEZZLEMENT',
  FRAUD = 'FRAUD',
  INDECENT_EXPOSURE = 'INDECENT_EXPOSURE',
  INTIMATE_RELATIONS = 'INTIMATE_RELATIONS',
  LEGAL_ENFORCEMENT_LAWS = 'LEGAL_ENFORCEMENT_LAWS',
  LOOTING = 'LOOTING',
  MAJOR_ASSAULT = 'MAJOR_ASSAULT',
  MINOR_ASSAULT = 'MINOR_ASSAULT',
  MONEY_LAUNDERING = 'MONEY_LAUNDERING',
  MURDER = 'MURDER',
  NARCOTICS_OFFENSE = 'NARCOTICS_OFFENSE',
  NAVAL_LAW_VIOLATION = 'NAVAL_LAW_VIOLATION',
  OTHER_CRIMINAL_OFFENSES = 'OTHER_CRIMINAL_OFFENSES',
  OTHER_OFFENSES = 'OTHER_OFFENSES',
  POLICE_REGULATIONS = 'POLICE_REGULATIONS',
  PROPERTY_DAMAGE = 'PROPERTY_DAMAGE',
  PUBLIC_SERVICE_VIOLATION = 'PUBLIC_SERVICE_VIOLATION',
  RAPE = 'RAPE',
  SEXUAL_OFFENSES_OTHER_THAN_RAPE = 'SEXUAL_OFFENSES_OTHER_THAN_RAPE',
  TAX_VIOLATION = 'TAX_VIOLATION',
  THEFT = 'THEFT',
  THREAT = 'THREAT',
  TRAFFIC_VIOLATION = 'TRAFFIC_VIOLATION',
  UTILITY_THEFT = 'UTILITY_THEFT',
  WEPONS_VIOLATION = 'WEPONS_VIOLATION',
}
export interface IndictmentSubtypeMap {
  [key: string]: IndictmentSubtype[]
}

export interface CrimeScene {
  place?: string
  date?: Date
}

export interface CrimeSceneMap {
  [key: string]: CrimeScene
}

export enum CaseState {
  NEW = 'NEW',
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  RECEIVED = 'RECEIVED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
  DISMISSED = 'DISMISSED',
}

export enum CaseTransition {
  OPEN = 'OPEN',
  SUBMIT = 'SUBMIT',
  RECEIVE = 'RECEIVE',
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  DELETE = 'DELETE',
  DISMISS = 'DISMISS',
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum CaseLegalProvisions {
  _95_1_A = '_95_1_A', // a-lið 1. mgr. 95. gr.
  _95_1_B = '_95_1_B', // b-lið 1. mgr. 95. gr.
  _95_1_C = '_95_1_C', // c-lið 1. mgr. 95. gr.
  _95_1_D = '_95_1_D', // d-lið 1. mgr. 95. gr.
  _95_2 = '_95_2', // 2. mgr. 95. gr.
  _99_1_B = '_99_1_B', // b-lið 1. mgr. 99. gr.
  _100_1 = '_100_1', // 1. mgr. 100. gr. sml.
}
/* eslint-enable @typescript-eslint/naming-convention */

export enum CaseCustodyRestrictions {
  NECESSITIES = 'NECESSITIES',
  ISOLATION = 'ISOLATION',
  VISITAION = 'VISITAION',
  COMMUNICATION = 'COMMUNICATION',
  MEDIA = 'MEDIA',
  ALTERNATIVE_TRAVEL_BAN_REQUIRE_NOTIFICATION = 'ALTERNATIVE_TRAVEL_BAN_REQUIRE_NOTIFICATION',
  WORKBAN = 'WORKBAN',
}

export enum CaseAppealDecision {
  APPEAL = 'APPEAL',
  ACCEPT = 'ACCEPT',
  POSTPONE = 'POSTPONE',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export enum CaseDecision {
  ACCEPTING = 'ACCEPTING',
  REJECTING = 'REJECTING',
  ACCEPTING_ALTERNATIVE_TRAVEL_BAN = 'ACCEPTING_ALTERNATIVE_TRAVEL_BAN',
  ACCEPTING_PARTIALLY = 'ACCEPTING_PARTIALLY',
  DISMISSING = 'DISMISSING',
}

export enum SessionArrangements {
  ALL_PRESENT = 'ALL_PRESENT',
  ALL_PRESENT_SPOKESPERSON = 'ALL_PRESENT_SPOKESPERSON',
  PROSECUTOR_PRESENT = 'PROSECUTOR_PRESENT',
}

export enum SubpoenaType {
  ARREST_SUMMONS = 'ARREST_SUMMONS',
  ABSENCE_SUMMONS = 'ABSENCE_SUMMONS',
}

export interface Case {
  id: string
  created: string
  modified: string
  origin: CaseOrigin
  type: CaseType
  indictmentSubtypes?: IndictmentSubtypeMap
  description?: string
  state: CaseState
  policeCaseNumbers: string[]
  defendants?: Defendant[]
  defenderName?: string
  defenderNationalId?: string
  defenderEmail?: string
  defenderPhoneNumber?: string
  sendRequestToDefender?: boolean
  isHeightenedSecurityLevel?: boolean
  court?: Institution
  leadInvestigator?: string
  arrestDate?: string
  requestedCourtDate?: string
  translator?: string
  requestedValidToDate?: string
  demands?: string
  lawsBroken?: string
  legalBasis?: string
  legalProvisions?: CaseLegalProvisions[]
  requestedCustodyRestrictions?: CaseCustodyRestrictions[]
  requestedOtherRestrictions?: string
  caseFacts?: string
  legalArguments?: string
  requestProsecutorOnlySession?: boolean
  prosecutorOnlySessionRequest?: string
  comments?: string
  caseFilesComments?: string
  creatingProsecutor?: User
  prosecutor?: User
  sharedWithProsecutorsOffice?: Institution
  courtCaseNumber?: string
  sessionArrangements?: SessionArrangements
  courtDate?: string
  courtLocation?: string
  courtRoom?: string
  courtStartDate?: string
  courtEndTime?: string
  isClosedCourtHidden?: boolean
  courtAttendees?: string
  prosecutorDemands?: string
  courtDocuments?: CourtDocument[]
  sessionBookings?: string
  courtCaseFacts?: string
  introduction?: string
  courtLegalArguments?: string
  ruling?: string
  decision?: CaseDecision
  validToDate?: string
  isValidToDateInThePast?: boolean
  isCustodyIsolation?: boolean
  isolationToDate?: string
  conclusion?: string
  endOfSessionBookings?: string
  accusedAppealDecision?: CaseAppealDecision
  accusedAppealAnnouncement?: string
  prosecutorAppealDecision?: CaseAppealDecision
  prosecutorAppealAnnouncement?: string
  accusedPostponedAppealDate?: string
  prosecutorPostponedAppealDate?: string
  isAppealDeadlineExpired?: boolean
  isAppealGracePeriodExpired?: boolean
  rulingDate?: string
  initialRulingDate?: string
  registrar?: User
  judge?: User
  courtRecordSignatory?: User
  courtRecordSignatureDate?: string
  parentCase?: Case
  childCase?: Case
  notifications?: Notification[]
  caseFiles?: CaseFile[]
  caseModifiedExplanation?: string
  rulingModifiedHistory?: string
  caseResentExplanation?: string
  seenByDefender?: string
  subpoenaType?: SubpoenaType
  defendantWaivesRightToCounsel?: boolean
  crimeScenes?: CrimeSceneMap
  indictmentIntroduction?: string
}

export interface CaseListEntry
  extends Pick<
    Case,
    | 'id'
    | 'created'
    | 'policeCaseNumbers'
    | 'state'
    | 'type'
    | 'defendants'
    | 'courtCaseNumber'
    | 'decision'
    | 'validToDate'
    | 'isValidToDateInThePast'
    | 'courtDate'
    | 'initialRulingDate'
    | 'rulingDate'
    | 'courtEndTime'
    | 'prosecutorAppealDecision'
    | 'accusedAppealDecision'
    | 'prosecutorPostponedAppealDate'
    | 'accusedPostponedAppealDate'
    | 'judge'
    | 'prosecutor'
    | 'registrar'
    | 'creatingProsecutor'
  > {
  parentCaseId?: string
}

export type CreateCase = Pick<
  Case,
  | 'type'
  | 'indictmentSubtypes'
  | 'description'
  | 'policeCaseNumbers'
  | 'defenderName'
  | 'defenderNationalId'
  | 'defenderEmail'
  | 'defenderPhoneNumber'
  | 'sendRequestToDefender'
  | 'leadInvestigator'
  | 'crimeScenes'
>

export interface UpdateCase
  extends Pick<
    Case,
    | 'indictmentSubtypes'
    | 'description'
    | 'defenderName'
    | 'defenderNationalId'
    | 'defenderEmail'
    | 'defenderPhoneNumber'
    | 'sendRequestToDefender'
    | 'isHeightenedSecurityLevel'
    | 'leadInvestigator'
    | 'arrestDate'
    | 'requestedCourtDate'
    | 'translator'
    | 'requestedValidToDate'
    | 'demands'
    | 'lawsBroken'
    | 'legalBasis'
    | 'legalProvisions'
    | 'requestedCustodyRestrictions'
    | 'requestedOtherRestrictions'
    | 'caseFacts'
    | 'legalArguments'
    | 'requestProsecutorOnlySession'
    | 'prosecutorOnlySessionRequest'
    | 'comments'
    | 'caseFilesComments'
    | 'courtCaseNumber'
    | 'sessionArrangements'
    | 'courtDate'
    | 'courtLocation'
    | 'courtRoom'
    | 'courtStartDate'
    | 'courtEndTime'
    | 'isClosedCourtHidden'
    | 'courtAttendees'
    | 'prosecutorDemands'
    | 'courtDocuments'
    | 'sessionBookings'
    | 'courtCaseFacts'
    | 'introduction'
    | 'courtLegalArguments'
    | 'ruling'
    | 'decision'
    | 'validToDate'
    | 'isCustodyIsolation'
    | 'isolationToDate'
    | 'conclusion'
    | 'endOfSessionBookings'
    | 'accusedAppealDecision'
    | 'accusedAppealAnnouncement'
    | 'prosecutorAppealDecision'
    | 'prosecutorAppealAnnouncement'
    | 'accusedPostponedAppealDate'
    | 'prosecutorPostponedAppealDate'
    | 'caseModifiedExplanation'
    | 'rulingModifiedHistory'
    | 'caseResentExplanation'
    | 'seenByDefender'
    | 'subpoenaType'
    | 'defendantWaivesRightToCounsel'
    | 'crimeScenes'
    | 'indictmentIntroduction'
  > {
  type?: CaseType
  policeCaseNumbers?: string[]
  courtId?: string
  prosecutorId?: string
  sharedWithProsecutorsOfficeId?: string | null
  registrarId?: string | null
  judgeId?: string
}

export interface TransitionCase {
  transition: CaseTransition
}

export interface RequestSignatureResponse {
  controlCode: string
  documentToken: string
}

export interface SignatureConfirmationResponse {
  documentSigned: boolean
  code?: number
  message?: string
}

export const indictmentCases = [CaseType.INDICTMENT]

export const restrictionCases = [
  CaseType.ADMISSION_TO_FACILITY,
  CaseType.CUSTODY,
  CaseType.TRAVEL_BAN,
]

export const investigationCases = [
  CaseType.AUTOPSY,
  CaseType.BANKING_SECRECY_WAIVER,
  CaseType.BODY_SEARCH,
  CaseType.ELECTRONIC_DATA_DISCOVERY_INVESTIGATION,
  CaseType.EXPULSION_FROM_HOME,
  CaseType.INTERNET_USAGE,
  CaseType.OTHER,
  CaseType.PHONE_TAPPING,
  CaseType.PSYCHIATRIC_EXAMINATION,
  CaseType.RESTRAINING_ORDER,
  CaseType.RESTRAINING_ORDER_AND_EXPULSION_FROM_HOME,
  CaseType.SEARCH_WARRANT,
  CaseType.SOUND_RECORDING_EQUIPMENT,
  CaseType.TELECOMMUNICATIONS,
  CaseType.TRACKING_EQUIPMENT,
  CaseType.VIDEO_RECORDING_EQUIPMENT,
]

export function isIndictmentCase(type: string): boolean {
  const caseType = type as CaseType
  return indictmentCases.includes(caseType)
}

export function isRestrictionCase(type: string): boolean {
  const caseType = type as CaseType
  return restrictionCases.includes(caseType)
}

export function isInvestigationCase(type: string): boolean {
  const caseType = type as CaseType
  return investigationCases.includes(caseType)
}

export function isAcceptingCaseDecision(decision?: CaseDecision): boolean {
  return Boolean(decision && acceptedCaseDecisions.includes(decision))
}

export const completedCaseStates = [
  CaseState.ACCEPTED,
  CaseState.REJECTED,
  CaseState.DISMISSED,
]

export const acceptedCaseDecisions = [
  CaseDecision.ACCEPTING,
  CaseDecision.ACCEPTING_PARTIALLY,
]

export function hasCaseBeenAppealed(theCase: Case): boolean {
  return (
    completedCaseStates.includes(theCase.state) &&
    (theCase.accusedAppealDecision === CaseAppealDecision.APPEAL ||
      theCase.prosecutorAppealDecision === CaseAppealDecision.APPEAL ||
      Boolean(theCase.accusedPostponedAppealDate) ||
      Boolean(theCase.prosecutorPostponedAppealDate))
  )
}
