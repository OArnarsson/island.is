import { Module } from '@nestjs/common'

import { ConfigModule } from '@island.is/nest/config'
import { LoggingModule } from '@island.is/logging'
import {
  messageModuleConfig,
  MessageModule,
} from '@island.is/judicial-system/message'

import { HealthController } from './health.controller'
import { MessageHandlerService } from './messageHandler.service'
import { InternalDeliveryService } from './internalDelivery.service'
import { appModuleConfig } from './app.config'

@Module({
  imports: [
    LoggingModule,
    MessageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [messageModuleConfig, appModuleConfig],
    }),
  ],
  controllers: [HealthController],
  providers: [InternalDeliveryService, MessageHandlerService],
})
export class AppModule {}
