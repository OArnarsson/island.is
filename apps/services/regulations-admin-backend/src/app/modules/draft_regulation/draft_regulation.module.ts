import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { DraftRegulationService } from './draft_regulation.service'
import { DraftRegulationController } from './draft_regulation.controller'
import { DraftRegulation } from './draft_regulation.model'
import { DraftRegulationChangeModule } from '../draft_regulation_change'
import { DraftRegulationCancelModule } from '../draft_regulation_cancel'

@Module({
  imports: [
    SequelizeModule.forFeature([DraftRegulation]),
    DraftRegulationChangeModule,
    DraftRegulationCancelModule,
  ],
  providers: [DraftRegulationService],
  controllers: [DraftRegulationController],
  exports: [DraftRegulationService],
})
export class DraftRegulationModule {}
