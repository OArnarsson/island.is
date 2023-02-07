import { getValueViaPath } from '@island.is/application/core'
import {
  Application,
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
  ApplicationTemplate,
  ApplicationTypes,
  DefaultEvents,
  defineTemplateApi,
  NationalRegistryUserApi,
  UserProfileApi,
  DistrictsApi,
} from '@island.is/application/types'
import { Features } from '@island.is/feature-flags'
import { assign } from 'xstate'
import {
  IdentityDocumentApi,
  SyslumadurPaymentCatalogApi,
} from '../dataProviders'
import { m } from '../lib/messages'
import {
  ApiActions,
  Events,
  Roles,
  sevenDays,
  sixtyDays,
  States,
  twoDays,
} from './constants'
import { dataSchema } from './dataSchema'

const pruneAfter = (time: number) => {
  return {
    shouldBeListed: true,
    shouldBePruned: true,
    whenToPrune: time,
  }
}

const PassportTemplate: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<Events>,
  Events
> = {
  type: ApplicationTypes.PASSPORT,
  name: m.formName.defaultMessage,
  featureFlag: Features.passportApplication,
  dataSchema,
  stateMachineConfig: {
    initial: States.DRAFT,
    states: {
      draft: {
        meta: {
          name: m.formName.defaultMessage,
          status: 'draft',
          progress: 0.33,
          lifecycle: pruneAfter(twoDays),
          onExit: defineTemplateApi({
            action: ApiActions.checkForDiscount,
          }),
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/Draft').then((val) =>
                  Promise.resolve(val.Draft),
                ),
              actions: [
                {
                  event: DefaultEvents.SUBMIT,
                  name: m.confirm.defaultMessage,
                  type: 'primary',
                },
                {
                  event: DefaultEvents.PAYMENT,
                  name: m.confirm.defaultMessage,
                  type: 'primary',
                },
              ],
              write: 'all',
              delete: true,
              api: [
                NationalRegistryUserApi,
                UserProfileApi,
                SyslumadurPaymentCatalogApi,
                IdentityDocumentApi,
                DistrictsApi,
              ],
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.DRAFT },
          [DefaultEvents.PAYMENT]: { target: States.PAYMENT },
        },
      },
      [States.PAYMENT]: {
        meta: {
          name: 'Payment state',
          status: 'inprogress',
          actionCard: {
            description: m.payment,
          },
          progress: 0.7,
          lifecycle: pruneAfter(sixtyDays),
          onEntry: defineTemplateApi({
            action: ApiActions.createCharge,
          }),
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/Payment').then((val) =>
                  Promise.resolve(val.payment),
                ),
              actions: [
                { event: DefaultEvents.ASSIGN, name: '', type: 'primary' },
                { event: DefaultEvents.SUBMIT, name: '', type: 'primary' },
              ],
              write: 'all',
              delete: true,
            },
          ],
        },
        on: {
          [DefaultEvents.ASSIGN]: { target: States.PARENT_B_CONFIRM },
          [DefaultEvents.SUBMIT]: { target: States.DONE },
        },
      },
      [States.PARENT_B_CONFIRM]: {
        entry: 'assignToParentB',
        meta: {
          name: 'ParentB',
          status: 'inprogress',
          progress: 0.9,
          lifecycle: pruneAfter(sevenDays),
          onEntry: defineTemplateApi({
            action: ApiActions.assignParentB,
          }),
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/WaitingForParentBConfirmation').then((val) =>
                  Promise.resolve(val.WaitingForParentBConfirmation),
                ),
              read: {
                answers: ['childsPersonalInfo'],
                externalData: ['submitPassportApplication'],
              },
            },
            {
              id: Roles.ASSIGNEE,
              formLoader: () =>
                import('../forms/ParentB').then((val) =>
                  Promise.resolve(val.ParentB),
                ),
              actions: [
                { event: DefaultEvents.SUBMIT, name: '', type: 'primary' },
              ],
              write: 'all',
              api: [
                NationalRegistryUserApi,
                UserProfileApi,
                SyslumadurPaymentCatalogApi,
                IdentityDocumentApi,
                DistrictsApi,
              ],
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: { target: States.DONE },
        },
      },
      [States.DONE]: {
        meta: {
          name: 'Done',
          status: 'completed',
          progress: 1,
          lifecycle: pruneAfter(sixtyDays),
          actionCard: {
            tag: {
              label: m.actionCardDoneTag,
            },
          },
          onEntry: defineTemplateApi({
            action: ApiActions.submitPassportApplication,
          }),
          roles: [
            {
              id: Roles.APPLICANT,
              formLoader: () =>
                import('../forms/Done').then((val) =>
                  Promise.resolve(val.Done),
                ),
              read: {
                externalData: ['submitPassportApplication'],
                answers: [
                  'submitPassportApplication',
                  'childsPersonalInfo',
                  'personalInfo',
                  'passport',
                ],
              },
            },
            {
              id: Roles.ASSIGNEE,
              formLoader: () =>
                import('../forms/Done').then((val) =>
                  Promise.resolve(val.Done),
                ),
              read: {
                externalData: ['submitPassportApplication'],
                answers: ['passport', 'childsPersonalInfo'],
              },
            },
          ],
        },
      },
    },
  },
  stateMachineOptions: {
    actions: {
      assignToParentB: assign((context) => {
        const parentB = getValueViaPath<string>(
          context.application.answers,
          'childsPersonalInfo.guardian2.nationalId',
        )

        return {
          ...context,
          application: {
            ...context.application,
            assignees: parentB ? [parentB] : [],
          },
        }
      }),
    },
  },
  mapUserToRole(
    nationalId: string,
    application: Application,
  ): ApplicationRole | undefined {
    if (application.assignees.includes(nationalId)) {
      return Roles.ASSIGNEE
    }
    if (nationalId === application.applicant) {
      return Roles.APPLICANT
    }
    return undefined
  },
}

export default PassportTemplate
