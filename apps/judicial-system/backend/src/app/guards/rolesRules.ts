import type { RolesRule } from '@island.is/judicial-system/auth'
import { UserRole } from '@island.is/judicial-system/types'

// Allows prosecutors to perform any action
export const prosecutorRule: RolesRule = UserRole.PROSECUTOR

// Allows representatives to perform any action
export const representativeRule: RolesRule = UserRole.REPRESENTATIVE

// Allows judges to perform any action
export const judgeRule: RolesRule = UserRole.JUDGE

// Allows registrars to perform any action
export const registrarRule: RolesRule = UserRole.REGISTRAR

// Allows assistants to perform any action
export const assistantRule: RolesRule = UserRole.ASSISTANT

// Allows staff to perform any action
export const staffRule: RolesRule = UserRole.STAFF

// Allows admins to perform any action
export const adminRule: RolesRule = UserRole.ADMIN

// Allows defenders to perform any action
export const defenderRule: RolesRule = UserRole.DEFENDER
