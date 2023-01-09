import { Includeable, OrderItem } from 'sequelize/types'
import { Sequelize } from 'sequelize-typescript'
import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/sequelize'

import type { User as TUser } from '@island.is/judicial-system/types'

import { Defendant } from '../defendant'
import { Institution } from '../institution'
import { User } from '../user'
import { Case } from '../case/models/case.model'
import { getCasesQueryFilter } from '../case/filters/case.filters'
import { CaseListEntry } from './caseList.model'

export const include: Includeable[] = [
  { model: Defendant, as: 'defendants' },
  {
    model: User,
    as: 'creatingProsecutor',
    include: [{ model: Institution, as: 'institution' }],
  },
  {
    model: User,
    as: 'prosecutor',
    include: [{ model: Institution, as: 'institution' }],
  },
  {
    model: User,
    as: 'judge',
    include: [{ model: Institution, as: 'institution' }],
  },
  {
    model: User,
    as: 'registrar',
    include: [{ model: Institution, as: 'institution' }],
  },
  { model: Case, as: 'parentCase' },
]

export const order: OrderItem[] = [
  [{ model: Defendant, as: 'defendants' }, 'created', 'ASC'],
]

@Injectable()
export class CaseListService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @InjectModel(CaseListEntry)
    private readonly caseListEntryModel: typeof CaseListEntry,
  ) {}

  getAll(user: TUser): Promise<CaseListEntry[]> {
    return this.caseListEntryModel.findAll({
      include,
      order,
      where: getCasesQueryFilter(user),
    })
  }
}