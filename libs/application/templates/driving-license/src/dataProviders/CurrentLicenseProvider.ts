import {
  BasicDataProvider,
  Application,
  SuccessfulDataProviderResult,
  FailedDataProviderResult,
  getValueViaPath,
} from '@island.is/application/core'
import { m } from '../lib/messages'
import { DrivingLicenseFakeData, YES } from '../lib/constants'
import { Eligibility, DrivingLicense } from '../types/schema'

export interface CurrentLicenseProviderResult {
  currentLicense: Eligibility['name'] | null
}
export class CurrentLicenseProvider extends BasicDataProvider {
  type = 'CurrentLicenseProvider'

  async provide(
    application: Application,
  ): Promise<CurrentLicenseProviderResult> {
    const fakeData = getValueViaPath<DrivingLicenseFakeData>(
      application.answers,
      'fakeData',
    )
    if (fakeData?.useFakeData === YES) {
      return {
        currentLicense: fakeData.currentLicense === 'temp' ? 'B' : null,
      }
    }

    const query = `
      query LicenseQuery {
        drivingLicense {
          categories {
            name
          }
        }
      }
    `

    const res = await this.useGraphqlGateway<{
      drivingLicense: DrivingLicense | null
    }>(query)

    if (!res.ok) {
      console.error('[CurrentLicenseProvider]', await res.json())

      return Promise.reject({
        reason: 'Náði ekki sambandi við vefþjónustu',
      })
    }

    const response = await res.json()

    if (response.errors) {
      return Promise.reject({ error: response.errors })
    }

    const categoryB = (response.data?.drivingLicense?.categories ?? []).find(
      (cat) => cat.name === 'B',
    )

    return {
      currentLicense: categoryB ? categoryB.name : null,
    }
  }

  onProvideError(): FailedDataProviderResult {
    return {
      date: new Date(),
      reason: m.errorDataProvider,
      status: 'failure',
    }
  }

  onProvideSuccess(
    result: CurrentLicenseProviderResult,
  ): SuccessfulDataProviderResult {
    return { date: new Date(), status: 'success', data: result }
  }
}