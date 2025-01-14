import { UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

import { IdsUserGuard } from '@island.is/auth-nest-tools'

import { TenantEnvironment } from './models/tenant-environment.model'

@UseGuards(IdsUserGuard)
@Resolver(() => TenantEnvironment)
export class TenantEnvironmentResolver {
  @ResolveField('id', () => String)
  resolveId(@Parent() tenant: TenantEnvironment) {
    return `${tenant.name}-${tenant.environment}`
  }
}
