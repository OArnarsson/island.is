import { GraphQLJSONObject } from 'graphql-type-json'

import { Field, ObjectType, ID } from '@nestjs/graphql'

import type {
  Case as TCase,
  CaseAppealDecision,
  CaseLegalProvisions,
  CaseCustodyRestrictions,
  CaseDecision,
  CaseState,
  CaseType,
  SessionArrangements,
  CourtDocument,
  CaseOrigin,
} from '@island.is/judicial-system/types'

import { Defendant } from '../../defendant'
import { Institution } from '../../institution'
import { User } from '../../user'
import { CaseFile } from '../../file'
import { Notification } from './notification.model'

@ObjectType()
export class Case implements TCase {
  @Field(() => ID)
  readonly id!: string

  @Field()
  readonly created!: string

  @Field()
  readonly modified!: string

  @Field(() => String)
  readonly origin!: CaseOrigin

  @Field(() => String)
  readonly type!: CaseType

  @Field({ nullable: true })
  readonly description?: string

  @Field(() => String)
  readonly state!: CaseState

  @Field()
  readonly policeCaseNumber!: string

  @Field(() => [Defendant], { nullable: true })
  readonly defendants?: Defendant[]

  @Field({ nullable: true })
  readonly defenderName?: string

  @Field({ nullable: true })
  readonly defenderNationalId?: string

  @Field({ nullable: true })
  readonly defenderEmail?: string

  @Field({ nullable: true })
  readonly defenderPhoneNumber?: string

  @Field({ nullable: true })
  readonly sendRequestToDefender?: boolean

  @Field({ nullable: true })
  isHeightenedSecurityLevel?: boolean

  @Field(() => Institution, { nullable: true })
  readonly court?: Institution

  @Field({ nullable: true })
  readonly leadInvestigator?: string

  @Field({ nullable: true })
  readonly arrestDate?: string

  @Field({ nullable: true })
  readonly requestedCourtDate?: string

  @Field({ nullable: true })
  readonly translator?: string

  @Field({ nullable: true })
  readonly requestedValidToDate?: string

  @Field({ nullable: true })
  readonly demands?: string

  @Field({ nullable: true })
  readonly lawsBroken?: string

  @Field({ nullable: true })
  readonly legalBasis?: string

  @Field(() => [String], { nullable: true })
  readonly legalProvisions?: CaseLegalProvisions[]

  @Field(() => [String], { nullable: true })
  readonly requestedCustodyRestrictions?: CaseCustodyRestrictions[]

  @Field({ nullable: true })
  readonly requestedOtherRestrictions?: string

  @Field({ nullable: true })
  readonly caseFacts?: string

  @Field({ nullable: true })
  readonly legalArguments?: string

  @Field({ nullable: true })
  readonly requestProsecutorOnlySession?: boolean

  @Field({ nullable: true })
  readonly prosecutorOnlySessionRequest?: string

  @Field({ nullable: true })
  readonly comments?: string

  @Field({ nullable: true })
  readonly caseFilesComments?: string

  @Field(() => User, { nullable: true })
  readonly creatingProsecutor?: User

  @Field(() => User, { nullable: true })
  readonly prosecutor?: User

  @Field(() => Institution, { nullable: true })
  readonly sharedWithProsecutorsOffice?: Institution

  @Field({ nullable: true })
  readonly courtCaseNumber?: string

  @Field(() => String, { nullable: true })
  readonly sessionArrangements?: SessionArrangements

  @Field({ nullable: true })
  readonly courtDate?: string

  @Field({ nullable: true })
  readonly courtLocation?: string

  @Field({ nullable: true })
  readonly courtRoom?: string

  @Field({ nullable: true })
  readonly courtStartDate?: string

  @Field({ nullable: true })
  readonly courtEndTime?: string

  @Field({ nullable: true })
  readonly isClosedCourtHidden?: boolean

  @Field({ nullable: true })
  readonly courtAttendees?: string

  @Field({ nullable: true })
  readonly prosecutorDemands?: string

  @Field(() => [GraphQLJSONObject], { nullable: true })
  readonly courtDocuments?: CourtDocument[]

  @Field({ nullable: true })
  readonly sessionBookings?: string

  @Field({ nullable: true })
  readonly courtCaseFacts?: string

  @Field({ nullable: true })
  readonly introduction?: string

  @Field({ nullable: true })
  readonly courtLegalArguments?: string

  @Field({ nullable: true })
  readonly ruling?: string

  @Field(() => String, { nullable: true })
  readonly decision?: CaseDecision

  @Field({ nullable: true })
  readonly validToDate?: string

  @Field({ nullable: true })
  readonly isValidToDateInThePast?: boolean

  @Field({ nullable: true })
  readonly isCustodyIsolation?: boolean

  @Field({ nullable: true })
  readonly isolationToDate?: string

  @Field({ nullable: true })
  readonly conclusion?: string

  @Field({ nullable: true })
  readonly endOfSessionBookings?: string

  @Field(() => String, { nullable: true })
  readonly accusedAppealDecision?: CaseAppealDecision

  @Field({ nullable: true })
  readonly accusedAppealAnnouncement?: string

  @Field(() => String, { nullable: true })
  readonly prosecutorAppealDecision?: CaseAppealDecision

  @Field({ nullable: true })
  readonly prosecutorAppealAnnouncement?: string

  @Field({ nullable: true })
  readonly accusedPostponedAppealDate?: string

  @Field({ nullable: true })
  readonly prosecutorPostponedAppealDate?: string

  @Field({ nullable: true })
  readonly isAppealDeadlineExpired?: boolean

  @Field({ nullable: true })
  readonly isAppealGracePeriodExpired?: boolean

  @Field({ nullable: true })
  readonly rulingDate?: string

  @Field({ nullable: true })
  readonly initialRulingDate?: string

  @Field(() => User, { nullable: true })
  readonly judge?: User

  @Field(() => User, { nullable: true })
  readonly registrar?: User

  @Field(() => User, { nullable: true })
  readonly courtRecordSignatory?: User

  @Field({ nullable: true })
  readonly courtRecordSignatureDate?: string

  @Field(() => Case, { nullable: true })
  readonly parentCase?: Case

  @Field(() => Case, { nullable: true })
  readonly childCase?: Case

  @Field(() => [Notification], { nullable: true })
  readonly notifications?: Notification[]

  @Field(() => [CaseFile], { nullable: true })
  readonly caseFiles?: CaseFile[]

  @Field({ nullable: true })
  readonly caseModifiedExplanation?: string

  @Field({ nullable: true })
  readonly rulingModifiedHistory?: string

  @Field({ nullable: true })
  readonly caseResentExplanation?: string
}
