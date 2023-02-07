import { CanActivate } from '@nestjs/common'

import { JwtAuthGuard, RolesGuard } from '@island.is/judicial-system/auth'

import { IndictmentCountController } from '../indictmentCount.controller'

describe('IndictmentCountController - guards', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let guards: any[]

  beforeEach(() => {
    guards = Reflect.getMetadata('__guards__', IndictmentCountController)
  })

  it('should have two guards', () => {
    expect(guards).toHaveLength(2)
  })

  describe('JwtAuthGuard', () => {
    let guard: CanActivate

    beforeEach(() => {
      guard = new guards[0]()
    })

    it('should have JwtAuthGuard as quard 1', () => {
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
})
