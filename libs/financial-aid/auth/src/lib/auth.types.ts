import { User } from '@island.is/financial-aid/shared'

export type Credentials = {
  user: User
  csrfToken: string
}

export type RolesRule = 'osk' | 'veita'
