import {
  SequelizeConfigService,
} from '@island.is/application/api/core'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { HistoryService } from './history.service'
import { History } from './history.model'
import { HistoryBuilder } from './historyBuilder'
import { CmsTranslationsModule } from '@island.is/cms-translations'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    SequelizeModule.forFeature([History]),
    CmsTranslationsModule,
  ],
  providers: [HistoryService, HistoryBuilder],
  exports: [HistoryService, HistoryBuilder],
})
export class HistoryModule {}
