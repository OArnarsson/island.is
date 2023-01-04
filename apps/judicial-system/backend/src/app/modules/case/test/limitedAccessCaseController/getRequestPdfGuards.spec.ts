import { CanActivate } from '@nestjs/common'

import { JwtAuthGuard, RolesGuard } from '@island.is/judicial-system/auth'
import {
  investigationCases,
  restrictionCases,
} from '@island.is/judicial-system/types'

import { CaseExistsGuard } from '../../guards/caseExists.guard'
import { CaseScheduledGuard } from '../../guards/caseScheduled.guard'
import { CaseDefenderGuard } from '../../guards/caseDefender.guard'
import { CaseTypeGuard } from '../../guards/caseType.guard'
import { LimitedAccessCaseController } from '../../limitedAccessCase.controller'

describe('LimitedAccessCaseController - Get request pdf guards', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let guards: any[]

  beforeEach(() => {
    guards = Reflect.getMetadata(
      '__guards__',
      LimitedAccessCaseController.prototype.getRequestPdf,
    )
  })

  it('should have six guards', () => {
    expect(guards).toHaveLength(6)
  })

  describe('JwtAuthGuard', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = guards[0]
    })

    it('should have JwtAuthGuard as quard 1', () => {
      // TODO: Verify that true is passed to the constructor
      expect(guard).toBeInstanceOf(JwtAuthGuard)
    })
  })

  describe('RolesGuard', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = new guards[1]()
    })

    it('should have RolesGuard as quard 2', () => {
      expect(guard).toBeInstanceOf(RolesGuard)
    })
  })

  describe('CaseExistsGuard', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = new guards[2]()
    })

    it('should have CaseExistsGuard as quard 3', () => {
      expect(guard).toBeInstanceOf(CaseExistsGuard)
    })
  })

  describe('CaseTypeGuerd', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = guards[3]
    })

    it('should have CaseTypeGuard as quard 4', () => {
      expect(guard).toBeInstanceOf(CaseTypeGuard)
      expect(guard).toEqual({
        allowedCaseTypes: [...restrictionCases, ...investigationCases],
      })
    })
  })

  describe('CaseScheduledGuard', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = new guards[4]()
    })

    it('should have CaseScheduledGuard as quard 5', () => {
      expect(guard).toBeInstanceOf(CaseScheduledGuard)
    })
  })

  describe('CaseDefenderGuard', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = new guards[5]()
    })

    it('should have CaseDefenderGuard as quard 6', () => {
      expect(guard).toBeInstanceOf(CaseDefenderGuard)
    })
  })
})
