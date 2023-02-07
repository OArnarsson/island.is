import { getModelToken } from '@nestjs/sequelize'
import { Test } from '@nestjs/testing'

import { LOGGER_PROVIDER } from '@island.is/logging'
import { SharedAuthModule } from '@island.is/judicial-system/auth'

import { environment } from '../../../../environments'
import { CaseService } from '../../case'
import { IndictmentCount } from '../models/indictmentCount.model'
import { IndictmentCountService } from '../indictmentCount.service'
import { IndictmentCountController } from '../indictmentCount.controller'

jest.mock('@island.is/judicial-system/message')
jest.mock('../../case/case.service')

export const createTestingIndictmentCountModule = async () => {
  const defendantModule = await Test.createTestingModule({
    imports: [
      SharedAuthModule.register({
        jwtSecret: environment.auth.jwtSecret,
        secretToken: environment.auth.secretToken,
      }),
    ],
    controllers: [IndictmentCountController],
    providers: [
      CaseService,
      {
        provide: LOGGER_PROVIDER,
        useValue: {
          debug: jest.fn(),
          info: jest.fn(),
          error: jest.fn(),
        },
      },
      {
        provide: getModelToken(IndictmentCount),
        useValue: {
          findOne: jest.fn(),
          findAll: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          destroy: jest.fn(),
          findByPk: jest.fn(),
        },
      },
      IndictmentCountService,
    ],
  }).compile()

  const indictmentCountModel = await defendantModule.resolve<
    typeof IndictmentCount
  >(getModelToken(IndictmentCount))

  const indictmentCountService = defendantModule.get<IndictmentCountService>(
    IndictmentCountService,
  )

  const indictmentCountController = defendantModule.get<IndictmentCountController>(
    IndictmentCountController,
  )

  return {
    indictmentCountModel,
    indictmentCountService,
    indictmentCountController,
  }
}
