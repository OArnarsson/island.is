import { Args, Query, Resolver } from '@nestjs/graphql'
import type { User } from '@island.is/auth-nest-tools'
import {
  IdsUserGuard,
  ScopesGuard,
  CurrentUser,
} from '@island.is/auth-nest-tools'
import { UseGuards } from '@nestjs/common'

import { MunicipalitiesFinancialAidService } from './municipalitiesFinancialAid.service'
import { MunicipalityModel } from './models/municipality.model'
import { MunicipalityQueryInput } from './models/municipality.input'

@UseGuards(IdsUserGuard, ScopesGuard)
@Resolver()
export class MunicipalitiesFinancialAidResolver {
  constructor(
    private municipalitiesFinancialAidService: MunicipalitiesFinancialAidService,
  ) {}

  @Query(() => String, { nullable: true })
  async hasUserFinancialAidApplicationForCurrentPeriod(
    @CurrentUser() user: User,
  ): Promise<string | null> {
    return await this.municipalitiesFinancialAidService.municipalitiesFinancialAidCurrentApplication(
      user,
    )
  }

  @Query(() => MunicipalityModel, { nullable: true })
  async municipalityInfoForFinancialAid(
    @Args('input', { type: () => MunicipalityQueryInput })
    input: MunicipalityQueryInput,
    @CurrentUser() user: User,
  ): Promise<MunicipalityModel | null> {
    return await this.municipalitiesFinancialAidService.municipalityInfoForFinancialAId(
      user,
      input,
    )
  }
}
