import {
  buildCustomField,
  buildDataProviderItem,
  buildDataProviderPermissionItem,
  buildDescriptionField,
  buildExternalDataProvider,
  buildForm,
  buildMultiField,
  buildRadioField,
  buildSelectField,
  buildSection,
  buildSubmitField,
  buildSubSection,
  buildTextField,
  getValueViaPath,
  buildDateField,
} from '@island.is/application/core'
import { Form, FormModes, UserProfileApi } from '@island.is/application/types'
import { isRunningOnEnvironment } from '@island.is/shared/utils'

import { parentalLeaveFormMessages, errorMessages } from '../lib/messages'
import Logo from '../assets/Logo'
import { ChildrenApi, GetPersonInformation } from '../dataProviders'
import {
  isEligibleForParentalLeave,
  getSelectedChild,
  getApplicationAnswers,
  getApplicationExternalData,
  isNotEligibleForParentWithoutBirthParent,
  isParentWithoutBirthParent,
} from '../lib/parentalLeaveUtils'
import {
  NO,
  YES,
  ParentalRelations,
  PERMANENT_FOSTER_CARE,
  OTHER_NO_CHILDREN_FOUND,
  ADOPTION,
} from '../constants'
import { defaultMultipleBirthsMonths } from '../config'

const shouldRenderMockDataSubSection = !isRunningOnEnvironment('production')

export const PrerequisitesForm: Form = buildForm({
  id: 'ParentalLeavePrerequisites',
  title: parentalLeaveFormMessages.shared.formTitle,
  logo: Logo,
  mode: FormModes.DRAFT,
  children: [
    buildSection({
      id: 'prerequisites',
      title: parentalLeaveFormMessages.shared.prerequisitesSection,
      children: [
        ...(shouldRenderMockDataSubSection
          ? [
              buildSubSection({
                id: 'mockData',
                title: parentalLeaveFormMessages.shared.mockDataTitle,
                children: [
                  buildMultiField({
                    id: 'shouldMock',
                    title: parentalLeaveFormMessages.shared.mockDataTitle,
                    children: [
                      buildRadioField({
                        id: 'mock.useMockData',
                        title: parentalLeaveFormMessages.shared.mockDataUse,
                        width: 'half',
                        options: [
                          {
                            value: YES,
                            dataTestId: 'mockdata-yes',
                            label:
                              parentalLeaveFormMessages.shared.yesOptionLabel,
                          },
                          {
                            value: NO,
                            dataTestId: 'mockdata-no',
                            label:
                              parentalLeaveFormMessages.shared.noOptionLabel,
                          },
                        ],
                      }),
                      buildRadioField({
                        id: 'mock.useMockedParentalRelation',
                        title:
                          parentalLeaveFormMessages.shared.mockDataRelationship,
                        width: 'half',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES

                          return useMockData
                        },
                        options: [
                          {
                            value: ParentalRelations.primary,
                            label:
                              parentalLeaveFormMessages.shared.mockDataMother,
                          },
                          {
                            value: ParentalRelations.secondary,
                            label:
                              parentalLeaveFormMessages.shared
                                .mockDataOtherParent,
                          },
                        ],
                      }),
                      buildRadioField({
                        id: 'mock.useMockedApplication',
                        title:
                          parentalLeaveFormMessages.shared
                            .mockDataExistingApplication,
                        width: 'half',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const isSecondaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.secondary

                          return useMockData && isSecondaryParent
                        },
                        options: [
                          {
                            value: YES,
                            label:
                              parentalLeaveFormMessages.shared.yesOptionLabel,
                          },
                          {
                            value: NO,
                            label:
                              parentalLeaveFormMessages.shared.noOptionLabel,
                          },
                        ],
                      }),
                      buildRadioField({
                        id: 'mock.noPrimaryParent',
                        title:
                          parentalLeaveFormMessages.shared.noChildrenFoundLabel,
                        width: 'half',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const useApplication =
                            getValueViaPath(
                              answers,
                              'mock.useMockedApplication',
                            ) === NO
                          const isSecondaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.secondary

                          return (
                            useMockData && useApplication && isSecondaryParent
                          )
                        },
                        options: [
                          {
                            value: YES,
                            label:
                              parentalLeaveFormMessages.shared.yesOptionLabel,
                          },
                          {
                            value: NO,
                            label:
                              parentalLeaveFormMessages.shared.noOptionLabel,
                          },
                        ],
                      }),
                      buildTextField({
                        id: 'mock.useMockedApplicationId',
                        title:
                          parentalLeaveFormMessages.shared
                            .mockDataApplicationID,
                        placeholder: 'bf1e5775-836c-4512-abae-bdbeb8709659',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const useApplication =
                            getValueViaPath(
                              answers,
                              'mock.useMockedApplication',
                            ) === YES
                          const isSecondaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.secondary

                          return (
                            useMockData && useApplication && isSecondaryParent
                          )
                        },
                      }),
                      buildTextField({
                        id: 'mock.useMockedDateOfBirth',
                        title:
                          parentalLeaveFormMessages.shared
                            .mockDataEstimatedDateOfBirth,
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const useApplication =
                            getValueViaPath(
                              answers,
                              'mock.useMockedApplication',
                            ) === NO
                          const useNoPrimaryParent =
                            getValueViaPath(answers, 'mock.noPrimaryParent') ===
                            NO
                          const isPrimaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.primary

                          return (
                            useMockData &&
                            ((!isPrimaryParent &&
                              useApplication &&
                              useNoPrimaryParent) ||
                              isPrimaryParent)
                          )
                        },
                        placeholder: 'YYYY-MM-DD',
                        format: '####-##-##',
                      }),
                      buildTextField({
                        id: 'mock.useMockedPrimaryParentRights',
                        title:
                          parentalLeaveFormMessages.shared
                            .mockDataPrimaryParentRights,
                        variant: 'number',
                        defaultValue: '180',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const isPrimaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.primary

                          return useMockData && isPrimaryParent
                        },
                      }),
                      buildTextField({
                        id: 'mock.useMockedPrimaryParentNationalRegistryId',
                        title:
                          parentalLeaveFormMessages.shared
                            .mockDataPrimaryParentNationalID,
                        placeholder: '1234567-7890',
                        format: '######-####',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const useApplication =
                            getValueViaPath(
                              answers,
                              'mock.useMockedApplication',
                            ) === NO
                          const useNoPrimaryParent =
                            getValueViaPath(answers, 'mock.noPrimaryParent') ===
                            NO
                          const isSecondaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.secondary

                          return (
                            useMockData &&
                            useApplication &&
                            useNoPrimaryParent &&
                            isSecondaryParent
                          )
                        },
                      }),
                      buildTextField({
                        id: 'mock.useMockedSecondaryParentRights',
                        title:
                          parentalLeaveFormMessages.shared
                            .mockDataSecondaryParentRights,
                        variant: 'number',
                        defaultValue: '180',
                        condition: (answers) => {
                          const useMockData =
                            getValueViaPath(answers, 'mock.useMockData') === YES
                          const useApplication =
                            getValueViaPath(
                              answers,
                              'mock.useMockedApplication',
                            ) === NO
                          const useNoPrimaryParent =
                            getValueViaPath(answers, 'mock.noPrimaryParent') ===
                            NO
                          const isSecondaryParent =
                            getValueViaPath(
                              answers,
                              'mock.useMockedParentalRelation',
                            ) === ParentalRelations.secondary

                          return (
                            useMockData &&
                            useApplication &&
                            useNoPrimaryParent &&
                            isSecondaryParent
                          )
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ]
          : []),
        buildSubSection({
          id: 'applicationType',
          title: parentalLeaveFormMessages.shared.applicationTypeTitle,
          children: [
            buildMultiField({
              id: 'applicationTypes',
              title: parentalLeaveFormMessages.shared.applicationTypeTitle,
              description:
                parentalLeaveFormMessages.shared
                  .applicationParentalLeaveDescription,
              children: [
                buildCustomField({
                  component: 'ApplicationType',
                  id: 'applicationType.option',
                  title: '',
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'externalData',
          title: parentalLeaveFormMessages.shared.externalDataSubSection,
          children: [
            buildExternalDataProvider({
              id: 'approveExternalData',
              title: parentalLeaveFormMessages.shared.introductionProvider,
              checkboxLabel: parentalLeaveFormMessages.shared.checkboxProvider,
              dataProviders: [
                buildDataProviderItem({
                  provider: UserProfileApi,
                  title:
                    parentalLeaveFormMessages.shared
                      .userProfileInformationTitle,
                  subTitle:
                    parentalLeaveFormMessages.shared
                      .userProfileInformationSubTitle,
                }),
                buildDataProviderItem({
                  provider: GetPersonInformation,
                  title:
                    parentalLeaveFormMessages.shared.familyInformationTitle,
                  subTitle:
                    parentalLeaveFormMessages.shared.familyInformationSubTitle,
                }),
                buildDataProviderItem({
                  provider: ChildrenApi,
                  title:
                    parentalLeaveFormMessages.shared.childrenInformationTitle,
                  subTitle:
                    parentalLeaveFormMessages.shared
                      .childrenInformationSubTitle,
                }),
              ],
              otherPermissions: [
                buildDataProviderPermissionItem({
                  id: 'salary',
                  title:
                    parentalLeaveFormMessages.shared.salaryInformationTitle,
                  subTitle:
                    parentalLeaveFormMessages.shared.salaryInformationSubTitle,
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'noChildrenFound',
          title: parentalLeaveFormMessages.shared.noChildrenFoundSubTitle,
          condition: (_, externalData) => {
            const { children } = getApplicationExternalData(externalData)
            return children.length === 0 // if no children found we want to ask these questions
          },
          children: [
            buildRadioField({
              id: 'noChildrenFound.typeOfApplication',
              title:
                parentalLeaveFormMessages.shared
                  .noChildrenFoundTypeOfApplication,
              options: [
                {
                  value: PERMANENT_FOSTER_CARE,
                  label:
                    parentalLeaveFormMessages.shared.noChildrenFoundFosterCare,
                },
                {
                  value: ADOPTION,
                  label:
                    parentalLeaveFormMessages.shared.noChildrenFoundAdoption,
                },
                {
                  value: OTHER_NO_CHILDREN_FOUND,
                  label: parentalLeaveFormMessages.shared.noChildrenFoundOther,
                },
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'fosterCareOrAdoptionApplication',
          title: parentalLeaveFormMessages.selectChild.screenTitle,
          condition: (answers) => {
            const { noChildrenFoundTypeOfApplication } = getApplicationAnswers(
              answers,
            )

            return noChildrenFoundTypeOfApplication === PERMANENT_FOSTER_CARE || noChildrenFoundTypeOfApplication === ADOPTION
          },
          children: [
            buildMultiField({
              id: 'fosterCareOrAdoption',
              title: parentalLeaveFormMessages.selectChild.screenTitle,
              description:
                parentalLeaveFormMessages.selectChild.fosterCareDescription,
              children: [
                buildDateField({
                  id: 'fosterCareOrAdoption.birthDate',
                  title:
                    parentalLeaveFormMessages.selectChild.fosterCareBirthDate,
                  description: '',
                  placeholder: parentalLeaveFormMessages.startDate.placeholder,
                }),
                buildDateField({
                  id: 'fosterCareOrAdoption.adoptionDate',
                  title:
                    parentalLeaveFormMessages.selectChild
                      .fosterCareAdoptionDate,
                  description: '',
                  placeholder: parentalLeaveFormMessages.startDate.placeholder,
                }),
                buildSubmitField({
                  id: 'toDraft',
                  title: parentalLeaveFormMessages.confirmation.title,
                  refetchApplicationAfterSubmit: true,
                  actions: [
                    {
                      event: 'SUBMIT',
                      name: parentalLeaveFormMessages.selectChild.choose,
                      type: ParentalRelations.primary, // er þetta rétt týpa?
                    },
                  ],
                }),
              ],
            }),
            // Has to be here so that the submit button appears (does not appear if no screen is left).
            // Tackle that as AS task.
            buildDescriptionField({
              id: 'unused',
              title: '',
              description: '',
            }),
          ],
        }),
        buildSubSection({
          id: 'noPrimaryParent',
          title: parentalLeaveFormMessages.shared.noPrimaryParentTitle,
          condition: (answers) => {
            const { noChildrenFoundTypeOfApplication } = getApplicationAnswers(
              answers,
            )

            return noChildrenFoundTypeOfApplication === OTHER_NO_CHILDREN_FOUND
          },
          children: [
            buildMultiField({
              id: 'noPrimaryParent',
              title: parentalLeaveFormMessages.shared.noPrimaryParentTitle,
              children: [
                buildRadioField({
                  id: 'noPrimaryParent.questionOne',
                  title:
                    parentalLeaveFormMessages.shared.noPrimaryParentQuestionOne,
                  options: [
                    { value: YES, label: 'Já' },
                    { value: NO, label: 'Nei' },
                  ],
                  width: 'half',
                  largeButtons: true,
                }),
                buildRadioField({
                  id: 'noPrimaryParent.questionTwo',
                  title:
                    parentalLeaveFormMessages.shared.noPrimaryParentQuestionTwo,
                  options: [
                    { value: YES, label: 'Já' },
                    { value: NO, label: 'Nei' },
                  ],
                  width: 'half',
                  largeButtons: true,
                }),
                buildRadioField({
                  id: 'noPrimaryParent.questionThree',
                  title:
                    parentalLeaveFormMessages.shared
                      .noPrimaryParentQuestionThree,
                  options: [
                    { value: YES, label: 'Já' },
                    { value: NO, label: 'Nei' },
                  ],
                  width: 'half',
                  largeButtons: true,
                }),
                buildDateField({
                  id: 'noPrimaryParent.birthDate',
                  condition: (answers) => isParentWithoutBirthParent(answers),
                  title:
                    parentalLeaveFormMessages.shared
                      .noPrimaryParentDatePickerTitle,
                  description: '',
                  placeholder: parentalLeaveFormMessages.startDate.placeholder,
                }),
                buildCustomField({
                  id: 'noPrimaryParent.alertMessage',
                  title: errorMessages.noChildData,
                  component: 'FieldAlertMessage',
                  description: parentalLeaveFormMessages.shared.childrenError,
                  doesNotRequireAnswer: true,
                  condition: (answers) =>
                    isNotEligibleForParentWithoutBirthParent(answers),
                }),
                buildSubmitField({
                  id: 'toDraft',
                  title: parentalLeaveFormMessages.confirmation.title,
                  refetchApplicationAfterSubmit: true,
                  actions: [
                    {
                      event: 'SUBMIT',
                      name: parentalLeaveFormMessages.selectChild.choose,
                      type: ParentalRelations.primary,
                      condition: (answers) =>
                        isParentWithoutBirthParent(answers),
                    },
                  ],
                }),
              ],
            }),
            // Has to be here so that the submit button appears (does not appear if no screen is left).
            // Tackle that as AS task.
            buildDescriptionField({
              id: 'unused',
              title: '',
              description: '',
            }),
          ],
        }),
        buildSubSection({
          id: 'selectChild',
          title: parentalLeaveFormMessages.selectChild.screenTitle,
          condition: (_, externalData) =>
            isEligibleForParentalLeave(externalData),
          children: [
            buildMultiField({
              id: 'selectedChildScreen',
              title: parentalLeaveFormMessages.selectChild.screenTitle,
              children: [
                buildCustomField({
                  id: 'selectedChild',
                  title: parentalLeaveFormMessages.selectChild.screenTitle,
                  component: 'ChildSelector',
                }),
                buildCustomField({
                  component: 'HasMultipleBirths',
                  id: 'multipleBirths.hasMultipleBirths',
                  title:
                    parentalLeaveFormMessages.selectChild.multipleBirthsName,
                  description:
                    parentalLeaveFormMessages.selectChild
                      .multipleBirthsDescription,
                  condition: (answers, externalData) =>
                    !!answers.selectedChild &&
                    getSelectedChild(answers, externalData)
                      ?.parentalRelation === ParentalRelations.primary,
                }),
                buildSelectField({
                  id: 'multipleBirths.multipleBirths',
                  title: parentalLeaveFormMessages.selectChild.multipleBirths,
                  options: new Array(defaultMultipleBirthsMonths)
                    .fill(0)
                    .map((_, index) => ({
                      value: `${index + 2}`,
                      label: `${index + 2}`,
                    })),
                  width: 'half',
                  condition: (answers, externalData) => {
                    const selectedChild =
                      getSelectedChild(answers, externalData)
                        ?.parentalRelation === ParentalRelations.primary
                    const { hasMultipleBirths } = getApplicationAnswers(answers)

                    return hasMultipleBirths === YES && selectedChild
                  },
                }),
                buildSubmitField({
                  id: 'toDraft',
                  title: parentalLeaveFormMessages.confirmation.title,
                  refetchApplicationAfterSubmit: true,
                  actions: [
                    {
                      event: 'SUBMIT',
                      dataTestId: 'select-child',
                      name: parentalLeaveFormMessages.selectChild.choose,
                      type: ParentalRelations.primary,
                    },
                  ],
                }),
              ],
            }),
            // Has to be here so that the submit button appears (does not appear if no screen is left).
            // Tackle that as AS task.
            buildDescriptionField({
              id: 'unused',
              title: '',
              description: '',
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'theApplicant',
      title: parentalLeaveFormMessages.shared.applicantSection,
      children: [],
    }),
    buildSection({
      id: 'rights',
      title: parentalLeaveFormMessages.shared.rightsSection,
      children: [],
    }),
    buildSection({
      id: 'leavePeriods',
      title: parentalLeaveFormMessages.shared.periodsSection,
      children: [],
    }),
    buildSection({
      id: 'confirmation',
      title: parentalLeaveFormMessages.confirmation.section,
      children: [],
    }),
  ],
})
