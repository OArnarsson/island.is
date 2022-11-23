import { BadRequestException, Injectable } from '@nestjs/common'

import { Auth, AuthMiddleware, User } from '@island.is/auth-nest-tools'
import {
  DomainsApi,
  DomainsControllerFindScopesDirectionEnum,
} from '@island.is/clients/auth/delegation-api'
import { ApiScope } from '../models/apiScope.model'
import { ScopeTreeNode } from '../models/scopeTreeNode.model'
import { ApiScopeServiceInterface } from '../services/types'
import { ApiScopesInput } from '../dto/apiScopes.input'

@Injectable()
export class ApiScopeServiceV2 implements ApiScopeServiceInterface {
  constructor(private domainsApi: DomainsApi) {}

  private domainsApiWithAuth(auth: Auth) {
    return this.domainsApi.withMiddleware(new AuthMiddleware(auth))
  }

  getApiScopes(user: User, input: ApiScopesInput): Promise<ApiScope[]> {
    this.checkDomain(input.domain)

    return this.domainsApiWithAuth(user).domainsControllerFindScopes({
      domainName: input.domain,
      lang: input.lang,
      // If we fix our openApi generation to support enumName to alias the enum type we can fix this.
      direction: (input.direction as unknown) as DomainsControllerFindScopesDirectionEnum,
    })
  }

  getScopeTree(
    user: User,
    input: ApiScopesInput,
  ): Promise<Array<typeof ScopeTreeNode>> {
    this.checkDomain(input.domain)

    return this.domainsApiWithAuth(user).domainsControllerFindScopeTree({
      domainName: input.domain,
      lang: input.lang,
      direction: input.direction,
    })
  }

  private checkDomain(domain?: string): asserts domain is string {
    if (domain == null) {
      throw new BadRequestException(`Domain is required.`)
    }
  }
}
