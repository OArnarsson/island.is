import { Injectable } from '@nestjs/common'
import { Auth, AuthMiddleware } from '@island.is/auth-nest-tools'
import { IslyklarApi } from '@island.is/clients/islykill'
import { UserProfileApi } from '@island.is/clients/user-profile'
import { isRunningOnEnvironment } from '@island.is/shared/utils'
import { TemplateApiModuleActionProps } from '../../../../types'
import { BaseTemplateApiService } from '../../../base-template-api.service'
import { UserProfile } from '@island.is/application/types'

export const MAX_OUT_OF_DATE_MONTHS = 6

@Injectable()
export class UserProfileService extends BaseTemplateApiService {
  constructor(
    private readonly userProfileApi: UserProfileApi,
    private readonly islyklarApi: IslyklarApi,
  ) {
    super('UserProfile')
  }

  userProfileApiWithAuth(auth: Auth): UserProfileApi {
    return this.userProfileApi.withMiddleware(new AuthMiddleware(auth))
  }

  async userProfile({
    auth,
  }: TemplateApiModuleActionProps): Promise<UserProfile> {
    // Temporary solution while we still run the old user profile service.
    return this.islyklarApi
      .islyklarGet({ ssn: auth.nationalId })

      .then((results) => {
        return {
          mobilePhoneNumber: results?.mobile,
          email: results?.email,
        }
      })
      .catch((error) => {
        if (isRunningOnEnvironment('local')) {
          return {
            email: 'mockEmail@island.is',
            mobilePhoneNumber: '+354-9999999',
          }
        }
        throw error
      })
  }
}
