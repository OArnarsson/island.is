import { Injectable } from '@nestjs/common'
import { SharedTemplateApiService } from '../../../shared'
import { TemplateApiModuleActionProps } from '../../../../types'
import { BaseTemplateApiService } from '../../../base-template-api.service'
import { ApplicationTypes } from '@island.is/application/types'
import {
  getChargeItemCodes,
  OrderVehicleRegistrationCertificateAnswers,
} from '@island.is/application/templates/transport-authority/order-vehicle-registration-certificate'
import { VehiclePrintingClient } from '@island.is/clients/transport-authority/vehicle-printing'

@Injectable()
export class OrderVehicleRegistrationCertificateService extends BaseTemplateApiService {
  constructor(
    private readonly sharedTemplateAPIService: SharedTemplateApiService,
    private readonly vehiclePrintingClient: VehiclePrintingClient,
  ) {
    super(ApplicationTypes.ORDER_VEHICLE_REGISTRATION_CERTIFICATE)
  }

  async createCharge({ application, auth }: TemplateApiModuleActionProps) {
    try {
      const SAMGONGUSTOFA_NATIONAL_ID = '5405131040'

      const answers = application.answers as OrderVehicleRegistrationCertificateAnswers

      const chargeItemCodes = getChargeItemCodes()

      const result = this.sharedTemplateAPIService.createCharge(
        auth,
        application.id,
        SAMGONGUSTOFA_NATIONAL_ID,
        chargeItemCodes,
        [{ name: 'vehicle', value: answers?.pickVehicle?.plate }],
      )
      return result
    } catch (exeption) {
      return { id: '', paymentUrl: '' }
    }
  }

  async submitApplication({
    application,
    auth,
  }: TemplateApiModuleActionProps): Promise<void> {
    const { paymentUrl } = application.externalData.createCharge.data as {
      paymentUrl: string
    }
    if (!paymentUrl) {
      throw new Error(
        'Ekki er búið að staðfesta greiðslu, hinkraðu þar til greiðslan er staðfest.',
      )
    }

    const isPayment:
      | { fulfilled: boolean }
      | undefined = await this.sharedTemplateAPIService.getPaymentStatus(
      auth,
      application.id,
    )

    if (!isPayment?.fulfilled) {
      throw new Error(
        'Ekki er búið að staðfesta greiðslu, hinkraðu þar til greiðslan er staðfest.',
      )
    }

    const answers = application.answers as OrderVehicleRegistrationCertificateAnswers
    const permno = answers?.pickVehicle?.plate

    // Submit the application
    await this.vehiclePrintingClient.requestRegistrationCardPrint(auth, permno)
  }
}
