import { Inject } from '@nestjs/common'
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'

import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'

import { Authorize } from '../auth'
import { GdprService } from './gdpr.service'
import { GdprModel } from './gdpr.model'

@Resolver(() => GdprModel)
export class GdprResolver {
  constructor(
    private gdprService: GdprService,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  @Authorize({ throwOnUnAuthorized: false })
  @Mutation((_) => Boolean)
  async createSkilavottordGdpr(
    @Args('nationalId') nationalId: string,
    @Args('gdprStatus') gdprStatus: string,
  ): Promise<boolean> {
    await this.gdprService.createGdpr(nationalId, gdprStatus)
    return true
  }

  @Query(() => GdprModel)
  async skilavottordGdpr(@Args('nationalId') nid: string): Promise<GdprModel> {
    return await this.gdprService.findByNationalId(nid)
  }

  @Query(() => [GdprModel])
  async skilavottordAllGdprs(): Promise<GdprModel[]> {
    const res = this.gdprService.findAll()
    this.logger.info('getAllGdrps responce:' + JSON.stringify(res, null, 2))
    return res
  }
}
