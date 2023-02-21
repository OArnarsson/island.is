import { Auth, AuthMiddleware, User } from '@island.is/auth-nest-tools'
import { Injectable } from '@nestjs/common'
import { ReturnTypeMessage } from '../../gen/fetch'
import { PlateOrderingApi } from '../../gen/fetch/apis'
import {
  DeliveryStation,
  SGS_DELIVERY_STATION_CODE,
  SGS_DELIVERY_STATION_TYPE,
  PlateOrder,
  PlateOrderValidation,
} from './vehiclePlateOrderingClient.types'

@Injectable()
export class VehiclePlateOrderingClient {
  constructor(private readonly plateOrderingApi: PlateOrderingApi) {}

  private plateOrderingApiWithAuth(auth: Auth) {
    return this.plateOrderingApi.withMiddleware(new AuthMiddleware(auth))
  }

  public async getDeliveryStations(
    auth: User,
  ): Promise<Array<DeliveryStation>> {
    const result = await this.plateOrderingApiWithAuth(
      auth,
    ).deliverystationsGet({
      apiVersion: '1.0',
      apiVersion2: '1.0',
    })

    return result.map((item) => ({
      name: item.name,
      type: item.stationType || '',
      code: item.stationCode || '',
    }))
  }

  public async validatePlateOrder(
    auth: User,
    permno: string,
    frontType: string,
    rearType: string,
  ): Promise<PlateOrderValidation> {
    let errorList: ReturnTypeMessage[] = []

    try {
      // Dummy values
      // Note: option "Pick up at Samgöngustofa" which is always valid
      const deliveryStationType = SGS_DELIVERY_STATION_TYPE
      const deliveryStationCode = SGS_DELIVERY_STATION_CODE
      const expressOrder = false

      await this.plateOrderingApiWithAuth(auth).orderplatesPost({
        apiVersion: '1.0',
        apiVersion2: '1.0',
        postOrderPlatesModel: {
          permno: permno,
          frontType: frontType,
          rearType: rearType,
          stationToDeliverTo: deliveryStationCode,
          stationType: deliveryStationType,
          expressOrder: expressOrder,
          checkOnly: true, // to make sure we are only validating
        },
      })
    } catch (e) {
      // Note: We need to wrap in try-catch to get the error messages, because if this action results in error,
      // we get 400 error (instead of 200 with error messages) with the errorList in this field (problem.Errors),
      // that is of the same class as 200 result schema
      if (e?.problem?.Errors) {
        errorList = e.problem.Errors as ReturnTypeMessage[]
      } else if (e?.body as ReturnTypeMessage[]) {
        errorList = e.body as ReturnTypeMessage[] //TODOx þarf þetta? Ef já á að bæta við í hinum umsóknunum
      } else {
        throw e
      }
    }

    const warnSeverityError = 'E'
    const warnSeverityWarning = 'W' //TODOx á W að vera með? Ef já, á þetta líka að bætast við í operators/plate-renewal?
    errorList = errorList.filter(
      (x) =>
        x.warnSever === warnSeverityError ||
        x.warnSever === warnSeverityWarning,
    )

    return {
      hasError: errorList.length > 0,
      errorMessages: errorList.map((item) => {
        return {
          errorNo: (item.warnSever || '_') + item.warningSerialNumber,
          defaultMessage: item.errorMess,
        }
      }),
    }
  }

  public async savePlateOrders(
    auth: User,
    plateOrder: PlateOrder,
  ): Promise<void> {
    await this.plateOrderingApiWithAuth(auth).orderplatesPost({
      apiVersion: '1.0',
      apiVersion2: '1.0',
      postOrderPlatesModel: {
        permno: plateOrder.permno,
        frontType: plateOrder.frontType,
        rearType: plateOrder.rearType,
        stationToDeliverTo: plateOrder.deliveryStationCode || '',
        stationType: plateOrder.deliveryStationType || '',
        expressOrder: plateOrder.expressOrder,
        checkOnly: false,
      },
    })
  }
}
