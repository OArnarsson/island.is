import get from 'lodash/get'

import { Message } from '@island.is/email-service'
import { EmailTemplateGeneratorProps } from '../../../../types'
import { pathToAsset } from '../parental-leave.utils'

export let assignLinkEmployerSMS = ''

export type AssignEmployerEmail = (
  props: EmailTemplateGeneratorProps,
  assignLink: string,
  senderName?: string,
  senderEmail?: string,
) => Message

// TODO handle translations
export const generateAssignEmployerApplicationEmail: AssignEmployerEmail = (
  props,
  assignLink,
): Message => {
  const {
    application,
    options: { email },
  } = props

  assignLinkEmployerSMS = assignLink

  const employerEmail = get(application.answers, 'employer.email')
  const applicantName = get(application.externalData, 'person.data.fullName')
  const subject = 'Yfirferð á umsókn um fæðingarorlof'

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [
      {
        name: '',
        address: employerEmail as string,
      },
    ],
    subject,
    template: {
      title: subject,
      body: [
        {
          component: 'Image',
          context: {
            src: pathToAsset('logo.jpg'),
            alt: 'Vinnumálastofnun merki',
          },
        },
        {
          component: 'Image',
          context: {
            src: pathToAsset('notification.jpg'),
            alt: 'Barn myndskreyting',
          },
        },
        { component: 'Heading', context: { copy: subject } },
        { component: 'Copy', context: { copy: 'Góðan dag.' } },
        {
          component: 'Copy',
          context: {
            copy: `${applicantName} Kt:${application.applicant} hefur skráð þig sem atvinnuveitanda í umsókn sinni.`,
          },
        },
        {
          component: 'Copy',
          context: {
            copy: `Ef þú áttir von á þessum tölvupósti smellir þú á takkan hér fyrir neðan. Ef annar einstaklingur á að samþykkja fæðingarorloftið má áframsenda póstinn á viðkomandi einstakling (passið þó að opna ekki linkinn).`,
          },
        },
        {
          component: 'Button',
          context: {
            copy: 'Yfirfara umsókn',
            href: assignLink,
          },
        },
        {
          component: 'Copy',
          context: {
            copy: `Ef hnappur virkar ekki, getur þú afritað hlekkinn hér að neðan og límt hann inn í vafrann þinn.`,
            small: true,
          },
        },
        {
          component: 'Copy',
          context: {
            copy: assignLink,
            small: true,
          },
        },
        {
          component: 'Copy',
          context: {
            copy: `Athugið: Ef upp kemur 404 villa hefur umsækjandi breytt umsókninni og sent nýja, þér ætti að hafa borist nýr póstur.`,
            small: true,
          },
        },
        {
          component: 'Copy',
          context: {
            copy: `<br />`,
            small: true,
          },
        },
        { component: 'Copy', context: { copy: 'Með kveðju,' } },
        { component: 'Copy', context: { copy: 'Fæðingarorlofssjóður' } },
      ],
    },
  }
}
