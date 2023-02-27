import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { Inject, Injectable } from '@nestjs/common'
import { Auth, AuthMiddleware, User } from '@island.is/auth-nest-tools'
import { createPkPassDataInput } from './adrLicenseClientMapper'
import { AdrApi, AdrDto } from '@island.is/clients/adr-and-machine-license'
import {
  Pass,
  PassDataInput,
  SmartSolutionsApi,
} from '@island.is/clients/smartsolutions'
import { format } from 'kennitala'
import { FetchError } from '@island.is/clients/middlewares'
import compareAsc from 'date-fns/compareAsc'
import { parseAdrLicenseResponse } from './adrLicenseClientMapper'
import {
  LicenseClient,
  LicensePkPassAvailability,
  PkPassVerification,
  PkPassVerificationInputData,
  Result,
} from '../../licenseClient.type'
import { FlattenedAdrDto } from './adrLicenseClient.type'

/** Category to attach each log message to */
const LOG_CATEGORY = 'adrlicense-service'

@Injectable()
export class AdrLicenseClient implements LicenseClient<FlattenedAdrDto> {
  constructor(
    @Inject(LOGGER_PROVIDER) private logger: Logger,
    private adrApi: AdrApi,
    private smartApi: SmartSolutionsApi,
  ) {}
  private checkLicenseValidityForPkPass(
    licenseInfo: AdrDto,
  ): LicensePkPassAvailability {
    if (!licenseInfo || !licenseInfo.gildirTil) {
      return LicensePkPassAvailability.Unknown
    }

    const expired = new Date(licenseInfo.gildirTil)
    const comparison = compareAsc(expired, new Date())

    if (isNaN(comparison) || comparison < 0) {
      return LicensePkPassAvailability.NotAvailable
    }

    return LicensePkPassAvailability.Available
  }

  private async fetchLicense(user: User): Promise<Result<AdrDto | null>> {
    try {
      const licenseInfo = await this.adrApi
        .withMiddleware(new AuthMiddleware(user as Auth))
        .getAdr()
      return { ok: true, data: licenseInfo }
    } catch (e) {
      //404 - no license for user, still ok!
      let error
      if (e instanceof FetchError) {
        //404 - no license for user, still ok!
        if (e.status === 404) {
          this.logger.info('ADR license not found for user', {
            LOG_CATEGORY,
          })
          return { ok: true, data: null }
        } else {
          error = {
            code: 13,
            message: 'Service failure',
            data: JSON.stringify(e.body),
          }
          this.logger.warn('Expected 200 or 404 status', {
            status: e.status,
            statusText: e.statusText,
            category: LOG_CATEGORY,
          })
        }
      } else {
        const unknownError = e as Error
        error = {
          code: 99,
          message: 'Unknown error',
          data: JSON.stringify(unknownError),
        }
        this.logger.warn('Unable to query data', {
          status: e.status,
          statusText: e.statusText,
          category: LOG_CATEGORY,
        })
      }

      return {
        ok: false,
        error,
      }
    }
  }

  licenseIsValidForPkPass(payload: unknown): LicensePkPassAvailability {
    return this.checkLicenseValidityForPkPass(payload as AdrDto)
  }

  async getLicense(user: User): Promise<Result<FlattenedAdrDto | null>> {
    const licenseData = await this.fetchLicense(user)

    if (!licenseData.ok) {
      return licenseData
    }

    if (licenseData.data === null) {
      //user doesn't have a license
      return {
        ok: true,
        data: null,
      }
    }

    const parsedData = parseAdrLicenseResponse(licenseData.data)

    return {
      ok: true,
      data: parsedData,
    }
  }

  async getLicenseDetail(user: User): Promise<Result<FlattenedAdrDto | null>> {
    return this.getLicense(user)
  }

  private async createPkPassPayload(
    data: AdrDto,
    nationalId: string,
  ): Promise<PassDataInput | null> {
    const inputValues = createPkPassDataInput(data, format(nationalId))

    if (!inputValues) return null
    //Fetch template from api?
    return {
      inputFieldValues: inputValues,
      expirationDate: data.gildirTil,
    }
  }

  private async getPkPass(user: User): Promise<Result<Pass>> {
    const license = await this.fetchLicense(user)

    if (!license.ok || !license.data) {
      this.logger.info(
        `No license data found for user, no pkpass payload to create`,
        { LOG_CATEGORY },
      )
      return {
        ok: false,
        error: {
          code: 3,
          message: 'No adr license data found',
        },
      }
    }

    const valid = this.licenseIsValidForPkPass(license.data)

    if (!valid) {
      return {
        ok: false,
        error: {
          code: 5,
          message: 'Pass is invalid for pkpass generation',
        },
      }
    }

    const payload = await this.createPkPassPayload(
      license.data,
      user.nationalId,
    )

    if (!payload) {
      return {
        ok: false,
        error: {
          code: 3,
          message: 'Missing payload',
        },
      }
    }

    const pass = await this.smartApi.generatePkPass(
      payload,
      format(user.nationalId),
    )

    return pass
  }

  async getPkPassQRCode(user: User): Promise<Result<string>> {
    const res = await this.getPkPass(user)

    if (!res.ok) {
      return res
    }

    return {
      ok: true,
      data: res.data.distributionQRCode,
    }
  }

  async getPkPassUrl(user: User): Promise<Result<string>> {
    const res = await this.getPkPass(user)

    if (!res.ok) {
      return res
    }

    return {
      ok: true,
      data: res.data.distributionUrl,
    }
  }

  async verifyPkPass(data: string): Promise<Result<PkPassVerification>> {
    const { code, date } = JSON.parse(data) as PkPassVerificationInputData
    const result = await this.smartApi.verifyPkPass({ code, date })

    if (!result.ok) {
      return result
    }

    /*
      TODO: VERIFICATION!!!!!!!! Máni (thorkellmani @ github)
      Currently Impossible
      A robust verification needs to both check that the PkPass is valid,
      and that the user being scanned does indeed have a license!.
      This method currently checks the validity of the PkPass, but we can't
      inspect the validity of their actual ADR license. As of now, we can
      only retrieve the license of a logged in user, not the user being scanned!
    */

    return {
      ok: true,
      data: result.data,
    }
  }
}