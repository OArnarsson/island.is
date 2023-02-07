import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'

import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'

import {
  AuditedAction,
  AuditTrailService,
} from '@island.is/judicial-system/audit-trail'
import {
  CurrentGraphQlUser,
  JwtGraphQlAuthGuard,
} from '@island.is/judicial-system/auth'
import type { User } from '@island.is/judicial-system/types'

import { BackendApi } from '../../data-sources'
import { CreateDefendantInput } from './dto/createDefendant.input'
import { UpdateDefendantInput } from './dto/updateDefendant.input'
import { DeleteDefendantInput } from './dto/deleteDefendant.input'
import { DeleteDefendantResponse } from './models/delete.response'
import { Defendant } from './models/defendant.model'

@UseGuards(JwtGraphQlAuthGuard)
@Resolver()
export class DefendantResolver {
  constructor(
    private readonly auditTrailService: AuditTrailService,
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Mutation(() => Defendant, { nullable: true })
  createDefendant(
    @Args('input', { type: () => CreateDefendantInput })
    input: CreateDefendantInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendApi },
  ): Promise<Defendant> {
    const { caseId, ...createDefendant } = input
    this.logger.debug(`Creating a new defendant for case ${caseId}`)

    return this.auditTrailService.audit(
      user.id,
      AuditedAction.CREATE_DEFENDANT,
      backendApi.createDefendant(caseId, createDefendant),
      (defendant) => defendant.id,
    )
  }

  @Mutation(() => Defendant, { nullable: true })
  updateDefendant(
    @Args('input', { type: () => UpdateDefendantInput })
    input: UpdateDefendantInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendApi },
  ): Promise<Defendant> {
    const { caseId, defendantId, ...updateDefendant } = input
    this.logger.debug(`Updating defendant ${defendantId} for case ${caseId}`)

    return this.auditTrailService.audit(
      user.id,
      AuditedAction.UPDATE_DEFENDANT,
      backendApi.updateDefendant(caseId, defendantId, updateDefendant),
      defendantId,
    )
  }

  @Mutation(() => DeleteDefendantResponse, { nullable: true })
  deleteDefendant(
    @Args('input', { type: () => DeleteDefendantInput })
    input: DeleteDefendantInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendApi },
  ): Promise<DeleteDefendantResponse> {
    const { caseId, defendantId } = input
    this.logger.debug(`Deleting defendant ${defendantId} for case ${caseId}`)

    return this.auditTrailService.audit(
      user.id,
      AuditedAction.UPDATE_DEFENDANT,
      backendApi.deleteDefendant(caseId, defendantId),
      defendantId,
    )
  }
}
