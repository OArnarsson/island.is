import {
  buildForm,
  buildDescriptionField,
  buildSection,
  Form,
  FormModes,
  buildRadioField,
  buildTextField,
  buildMultiField,
  buildRepeater,
  buildCustomField,
  FormValue,
  buildSubSection,
} from '@island.is/application/core'
import { NO, YES } from '../shared'
import { section, delimitation, errorCards, info } from '../lib/messages'
import { OnBehalf } from '../lib/dataSchema'

const yesOption = { value: 'yes', label: 'Já' }
const noOption = { value: 'no', label: 'Nei' }

export const ComplaintForm: Form = buildForm({
  id: 'DataProtectionComplaintForm',
  title: 'Atvinnuleysisbætur',
  mode: FormModes.APPLYING,
  children: [
    buildSection({
      id: 'delimitation',
      title: section.delimitation.defaultMessage,
      children: [
        buildSubSection({
          id: 'authoritiesSection',
          title: section.authorities.defaultMessage,
          children: [
            buildMultiField({
              id: 'inCourtProceedingsFields',
              title: delimitation.labels.inCourtProceedings,
              description: delimitation.general.pageTitle,
              children: [
                buildRadioField({
                  id: 'inCourtProceedings',
                  title: '',
                  options: [noOption, yesOption],
                  largeButtons: true,
                  width: 'half',
                }),
                buildCustomField({
                  component: 'FieldAlertMessage',
                  id: 'inCourtProceedingsAlert',
                  title: errorCards.inCourtProceedingsTitle,
                  description: errorCards.inCourtProceedingsDescription,
                  condition: (formValue) =>
                    formValue.inCourtProceedings === YES,
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'mediaSection',
          title: section.media.defaultMessage,
          children: [
            buildMultiField({
              id: 'concernsMediaCoverageFields',
              title: delimitation.labels.concernsMediaCoverage,
              description: delimitation.general.pageTitle,
              children: [
                buildRadioField({
                  id: 'concernsMediaCoverage',
                  title: '',
                  options: [noOption, yesOption],
                  largeButtons: true,
                  width: 'half',
                }),
                buildCustomField({
                  component: 'FieldAlertMessage',
                  id: 'concernsMediaCoverageAlert',
                  title: errorCards.concernsMediaCoverageTitle,
                  description: errorCards.concernsMediaCoverageDescription,
                  condition: (formValue) =>
                    formValue.concernsMediaCoverage === YES,
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'banMarkingSection',
          title: section.banMarking.defaultMessage,
          children: [
            buildMultiField({
              id: 'concernsBanMarkingFields',
              title: delimitation.labels.concernsBanMarking,
              description: delimitation.general.pageTitle,
              children: [
                buildRadioField({
                  id: 'concernsBanMarking',
                  title: '',
                  options: [noOption, yesOption],
                  largeButtons: true,
                  width: 'half',
                }),
                buildCustomField({
                  component: 'FieldAlertMessage',
                  id: 'concernsBanMarkingAlert',
                  title: errorCards.concernsBanMarkingTitle,
                  description: errorCards.concernsBanMarkingDescription,
                  condition: (formValue) =>
                    formValue.concernsBanMarking === YES,
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'libelSection',
          title: section.libel.defaultMessage,
          children: [
            buildMultiField({
              id: 'concernsLibelFields',
              title: delimitation.labels.concernsLibel,
              description: delimitation.general.pageTitle,
              children: [
                buildRadioField({
                  id: 'concernsLibel',
                  title: '',
                  options: [noOption, yesOption],
                  largeButtons: true,
                  width: 'half',
                }),
                buildCustomField({
                  component: 'FieldAlertMessage',
                  id: 'concernsLibelAlert',
                  title: errorCards.concernsLibelTitle,
                  description: errorCards.concernsLibelDescription,
                  condition: (formValue) =>
                    (formValue.delimitation as FormValue)?.concernsLibel ===
                    YES,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'info',
      title: section.info.defaultMessage,
      children: [
        buildSubSection({
          id: 'onBehalf',
          title: section.onBehalf.defaultMessage,
          children: [
            buildMultiField({
              id: 'onBehalfFields',
              title: info.general.pageTitle,
              description: info.general.description,
              children: [
                buildRadioField({
                  id: 'info.onBehalf',
                  title: '',
                  options: [
                    { value: OnBehalf.MYSELF, label: info.labels.myself },
                    {
                      value: OnBehalf.MYSELF_AND_OR_OTHERS,
                      label: info.labels.myselfAndOrOthers,
                    },
                    { value: OnBehalf.COMPANY, label: info.labels.company },
                    {
                      value: OnBehalf.ORGANIZATION_OR_INSTITUTION,
                      label: info.labels.organizationInstitution,
                    },
                  ],
                  largeButtons: true,
                  width: 'half',
                }),
                buildCustomField({
                  component: 'FieldAlertMessage',
                  id: 'info.onBehalfOfACompanyAlertMessage',
                  title: errorCards.onBehalfOfACompanyTitle,
                  description: errorCards.onBehalfOfACompanyDescription,
                  condition: (formValue) =>
                    (formValue.info as FormValue)?.onBehalf ===
                    OnBehalf.COMPANY,
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'applicant',
          title: section.applicant.defaultMessage,
          children: [
            buildMultiField({
              id: 'applicantSection',
              title: info.general.applicantPageTitle,
              description: info.general.applicantPageDescription,
              children: [
                buildTextField({
                  id: 'applicant.name',
                  title: info.labels.name,
                  backgroundColor: 'blue',
                }),
                buildTextField({
                  id: 'applicant.nationalId',
                  title: info.labels.nationalId,
                  width: 'half',
                  backgroundColor: 'blue',
                }),
                buildTextField({
                  id: 'applicant.address',
                  title: info.labels.address,
                  width: 'half',
                  backgroundColor: 'blue',
                }),
                buildTextField({
                  id: 'applicant.postalCode',
                  title: info.labels.postalCode,
                  width: 'half',
                  backgroundColor: 'blue',
                }),
                buildTextField({
                  id: 'applicant.city',
                  title: info.labels.city,
                  width: 'half',
                  backgroundColor: 'blue',
                }),
                buildTextField({
                  id: 'applicant.email',
                  title: info.labels.email,
                  width: 'half',
                  variant: 'email',
                  backgroundColor: 'blue',
                }),
                buildTextField({
                  id: 'applicant.phoneNumber',
                  title: info.labels.tel,
                  width: 'half',
                  variant: 'tel',
                  backgroundColor: 'blue',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'last',
      title: 'Búinn skref',
      children: [
        buildDescriptionField({
          id: 'field',
          title: "I guess the journey's never really over",
          description: (application) => ({
            defaultMessage: 'Done',
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            values: { name: application.answers.name },
          }),
        }),
      ],
    }),
  ],
})
