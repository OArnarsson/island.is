import {
  FirearmLicenseClientModule,
  OpenFirearmLicenseClientModule,
} from '@island.is/clients/firearm-license'
import {
  SmartSolutionsApiClientModule,
  SmartSolutionsConfig,
} from '@island.is/clients/smartsolutions'
import { Module } from '@nestjs/common'
import { ConfigType } from '@island.is/nest/config'
import { FirearmLicenseClient } from './firearmLicenseClient.service'
import { FirearmDigitalLicenseClientConfig } from './firearmLicenseClient.config'

@Module({
  imports: [
    FirearmLicenseClientModule,
    OpenFirearmLicenseClientModule,
    SmartSolutionsApiClientModule.registerAsync({
      useFactory: (
        config: ConfigType<typeof FirearmDigitalLicenseClientConfig>,
      ) => {
        const smartConfig: SmartSolutionsConfig = {
          apiKey: config.apiKey,
          apiUrl: config.apiUrl,
          passTemplateId: config.passTemplateId,
        }
        return smartConfig
      },
      inject: [FirearmDigitalLicenseClientConfig.KEY],
    }),
  ],
  providers: [FirearmLicenseClient],
  exports: [FirearmLicenseClient],
})
export class FirearmClientModule {}