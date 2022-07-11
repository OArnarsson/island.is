import { EventObject, MachineConfig } from 'xstate'
import { MachineOptions, StatesConfig } from 'xstate/lib/types'

import { Application } from './Application'
import {
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
} from './StateMachine'
import { ApplicationTypes } from './ApplicationTypes'
import { Schema, StaticText } from './Form'
import { AnswerValidator } from '../validation/AnswerValidator'
import { Features } from '@island.is/feature-flags'
import { AuthDelegationType } from '@island.is/auth-nest-tools'

export interface ApplicationTemplate<
  TContext extends ApplicationContext,
  TStateSchema extends ApplicationStateSchema<TEvents>,
  TEvents extends EventObject
> {
  /**
   * @deprecated Use featureFlag instead.
   */
  readonly readyForProduction?: boolean
  readonly featureFlag?: Features
  readonly type: ApplicationTypes
  readonly name: StaticText
  readonly institution?: StaticText
  readonly translationNamespaces?: string[]
  readonly allowedDelegations?: AuthDelegationType[]
  readonly dataSchema: Schema
  readonly stateMachineConfig: MachineConfig<
    TContext,
    TStateSchema,
    TEvents
  > & {
    states: StatesConfig<TContext, TStateSchema, TEvents> // TODO Extend StatesConfig to completely enforce meta being required attribute
  }
  readonly stateMachineOptions?: Partial<MachineOptions<TContext, TEvents>>
  mapUserToRole(
    nationalId: string,
    application: Application,
  ): ApplicationRole | undefined
  answerValidators?: Record<string, AnswerValidator>
}