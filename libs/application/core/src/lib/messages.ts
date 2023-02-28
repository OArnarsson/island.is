import { defineMessages } from 'react-intl'

export const coreMessages = defineMessages({
  buttonNext: {
    id: 'application.system:button.next',
    defaultMessage: 'Halda áfram',
    description: 'Next',
  },
  buttonBack: {
    id: 'application.system:button.back',
    defaultMessage: 'Til baka',
    description: 'Back',
  },
  buttonSubmit: {
    id: 'application.system:button.submit',
    defaultMessage: 'Senda',
    description: 'Submit',
  },
  reviewButtonSubmit: {
    id: 'application.system:reviewButton.submit',
    defaultMessage: 'Vista',
    description: 'Save',
  },
  buttonApprove: {
    id: 'application.system:button.approve',
    defaultMessage: 'Samþykkja',
    description: 'Approve button copy',
  },
  buttonReject: {
    id: 'application.system:button.reject',
    defaultMessage: 'Hafna',
    description: 'Reject button copy',
  },
  buttonEdit: {
    id: 'application.system:button.edit',
    defaultMessage: 'Breyta',
    description: 'Edit button for review screen and so on',
  },
  cardButtonInProgress: {
    id: 'application.system:card.button.inProgress',
    defaultMessage: 'Opna umsókn',
    description: 'Button label when application is in progress',
  },
  cardButtonDraft: {
    id: 'application.system:card.button.Draft',
    defaultMessage: 'Opna umsókn',
    description: 'Button label when application is in draft',
  },
  cardButtonRejected: {
    id: 'application.system:card.button.Rejected',
    defaultMessage: 'Skoða yfirlit',
    description: 'Button label when application is rejected',
  },
  cardButtonApproved: {
    id: 'application.system:card.button.Approved',
    defaultMessage: 'Skoða yfirlit',
    description: 'Button label when application is approved',
  },
  cardButtonNotStarted: {
    id: 'application:card.button.notStarted',
    defaultMessage: 'Hefja umsókn',
    description: 'Button label when application is not started',
  },
  cardButtonComplete: {
    id: 'application.system:card.button.complete',
    defaultMessage: 'Skoða yfirlit',
    description: 'Button label when application is complete',
  },
  externalDataTitle: {
    id: 'application.system:externalData.title',
    defaultMessage: 'Eftirfarandi gögn verða sótt rafrænt með þínu samþykki',
    description:
      'The following data will be retrieved electronically with your consent',
  },
  externalDataAgreement: {
    id: 'application.system:externalData.agreement',
    defaultMessage: 'Ég samþykki',
    description: 'I agree',
  },
  updateOrSubmitError: {
    id: 'application.system:submit.error',
    defaultMessage: 'Eitthvað fór úrskeiðis: {error}',
    description: 'Error message on submit: {error}',
  },
  globalErrorTitle: {
    id: 'application.system:boundary.error.title',
    defaultMessage: 'Úps! Eitthvað fór úrskeiðis',
    description: 'Oops! Something went wrong',
  },
  globalErrorMessage: {
    id: 'application.system:boundary.error.message',
    defaultMessage:
      'Fyrirgefðu! Eitthvað fór rosalega úrskeiðis og við erum að skoða það',
    description:
      'Sorry! Something went terribly wrong and we are looking into it',
  },
  userRoleError: {
    id: 'application.system:user.role.error',
    defaultMessage:
      'Innskráður notandi hefur ekki hlutverk í þessu umsóknarástandi',
    description:
      'Logged in user does not have a role in this application state',
  },
  notFoundTitle: {
    id: 'application.system:notFound',
    defaultMessage: 'Umsókn finnst ekki',
    description: 'Application not found',
  },
  notFoundSubTitle: {
    id: 'application.system:notFound.message',
    defaultMessage: 'Engin umsókn fannst á þessari slóð.',
    description: 'No application was found at this URL.',
  },
  notFoundApplicationType: {
    id: 'application.system:notFound.application.type',
    defaultMessage: 'Þessi gerð umsókna er ekki til',
    description: 'This type of application does not exist',
  },
  notFoundApplicationTypeMessage: {
    id: 'application.system:notFound.application.message',
    defaultMessage: 'Engin umsókn er til af gerðinni: {type}',
    description: 'There is no application of the type: {type}',
  },
  createErrorApplication: {
    id: 'application.system:create.error.application',
    defaultMessage: 'Eitthvað fór úrskeiðis',
    description: 'Something went wrong',
  },
  createErrorApplicationMessage: {
    id: 'application.system:create.error.application.message',
    defaultMessage: 'Ekki tókst að búa til umsókn af gerðinni: {type}',
    description: 'Failed to create application of type: {type}',
  },
  applications: {
    id: 'application.system:applications',
    defaultMessage: 'Þínar umsóknir',
    description: 'Your applications',
  },
  newApplication: {
    id: 'application.system:new.application',
    defaultMessage: 'Ný umsókn',
    description: 'New application',
  },
  tagsInProgress: {
    id: 'application.system:tags.inProgress',
    defaultMessage: 'Í ferli',
    description: 'In progress status for an application',
  },
  tagsDone: {
    id: 'application.system:tags.completed',
    defaultMessage: 'Lokið',
    description: 'Done status for an application',
  },
  tagsRejected: {
    id: 'application.system:tags.rejected',
    defaultMessage: 'Hafnað',
    description: 'Rejected status for an application',
  },
  tagsApproved: {
    id: 'application.system:tags.approved',
    defaultMessage: 'Samþykkt',
    description: 'Approved status for an application',
  },
  tagsDraft: {
    id: 'application.system:tags.draft',
    defaultMessage: 'Umsókn í vinnslu hjá þér',
    description: 'Draft status for an application',
  },
  tagsRequiresAction: {
    id: 'application.system:tags.requiresAction',
    defaultMessage: 'Krefst aðgerða',
    description: 'Requires action',
  },
  thanks: {
    id: 'application.system:thanks',
    defaultMessage: 'Takk fyrir',
    description: 'Thank you',
  },
  thanksDescription: {
    id: 'application.system:thanks.description',
    defaultMessage:
      'Úrvinnslu þinni er lokið. Umsókn er komin áfram í ferlinu.',
    description:
      'Your application is complete. The application has progressed in the process.',
  },
  notLoggedIn: {
    id: 'application.system:not.logged.id',
    defaultMessage: 'Þú þarft að vera skrá þig inn.',
    description: 'You need to be logged in.',
  },
  notLoggedInDescription: {
    id: 'application.system:not.logged.id.description',
    defaultMessage: 'Til að halda áfram umsóknarferli þarftu að skrá þig inn.',
    description:
      'To continue the application process, you will need to sign in.',
  },
  radioYes: {
    id: 'application.system:radio.option.yes',
    defaultMessage: 'Já',
    description: 'Yes option value',
  },
  radioNo: {
    id: 'application.system:radio.option.no',
    defaultMessage: 'Nei',
    description: 'No option value',
  },
  paymentPollingIndicator: {
    id: 'application.system:core.payment.pollingIndicator',
    defaultMessage: 'Bíð staðfestingar frá greiðsluveitu',
    description:
      'Text indicating we are waiting for confirmation from 3rd party payment gateway',
  },
  deleteApplicationDialogTitle: {
    id: 'application.system:delete.application.dialog.title',
    defaultMessage: 'Eyða umsókn',
    description: 'Delete application dialog title',
  },
  deleteApplicationDialogDescription: {
    id: 'application.system:delete.application.dialog.description',
    defaultMessage: 'Ertu viss um að þú viljir eyða þessari umsókn?',
    description: 'Delete application dialog description',
  },
  deleteApplicationDialogConfirmLabel: {
    id: 'application.system:delete.application.dialog.confirm',
    defaultMessage: 'Já, eyða',
    description: 'Delete application dialog confirm',
  },
  deleteApplicationDialogCancelLabel: {
    id: 'application.system:delete.application.dialog.cancel',
    defaultMessage: 'Hætta við',
    description: 'Delete application dialog cancel',
  },
  openApplicationHistoryLabel: {
    id: 'application.system:core.history.open',
    defaultMessage: 'Opna umsóknarsögu',
    description: 'Open application history button',
  },
  closeApplicationHistoryLabel: {
    id: 'application.system:core.history.close',
    defaultMessage: 'Loka umsóknarsögu',
    description: 'Close application history button',
  },
  openServicePortalMessageText: {
    id: 'application.system:openServicePortal.messageText',
    defaultMessage:
      'Upplýsingar í mínum síðum og í appi hefur þú aðgang að margvíslegum upplýsingum s.s stafrænt pósthólf, þínar upplýsingar, fjármál, umsóknir, menntun, fasteignir, ökutæki, skírteini, starfsleyfi ofl.',
    description:
      'Text for form builder component left side of button to go to the service portal',
  },
  openServicePortalButtonTitle: {
    id: 'application.system:openServicePortal.buttonTitle',
    defaultMessage: 'Áfram',
    description: 'Button text for form builder component, go to service portal',
  },
})

export const coreErrorMessages = defineMessages({
  defaultTemplateApiError: {
    id: 'application.system:core.defaultTemplateApiError',
    defaultMessage: 'Villa kom upp',
    description: 'Unkonwn template api error',
  },
  defaultError: {
    id: 'application.system:core.default.error',
    defaultMessage: 'Ógilt gildi',
    description: 'Generic invalid value error message',
  },
  errorDataProvider: {
    id: 'application.system:core.error.dataProvider',
    defaultMessage: 'Úps! Eitthvað fór úrskeiðis við að sækja gögnin þín',
    description: 'Oops! Something went wrong when fetching your data',
  },
  errorDataProviderMaritalStatus: {
    id: 'application.system:core.error.dataProviderMaritalStatus',
    defaultMessage:
      'Núverandi hjúskaparstaða þín leyfir þér ekki að halda áfram með þessa umsókn. Vinsamlega hafðu samband við Sýslumanninn í Vestmannaeyjum fyrir nánari upplýsingar.',
    description: 'Oops! Something went wrong when fetching your data',
  },
  fileUpload: {
    id: 'application.system:core.error.file.upload',
    defaultMessage: 'Villa kom upp við að hlaða inn einni eða fleiri skrám.',
    description: 'Error message when upload file fails',
  },
  fileRemove: {
    id: 'application.system:core.error.file.remove',
    defaultMessage: 'Villa kom upp við að fjarlægja skrána.',
    description: 'Error message when deleting a file fails',
  },
  fileMaxSizeLimitExceeded: {
    id: 'application.system:core.error.file.maxSizeLimitExceeded',
    defaultMessage:
      'Skráin er of stór. Hægt er að hlaða inn skrám sem eru {maxSizeInMb}MB eða minni.',
    description: 'Error message when file size exceeds max size limit',
  },
  fileInvalidExtension: {
    id: 'application.system:core.error.file.invalidExtension',
    defaultMessage:
      'Skráin er ekki í réttu sniði. Hægt er að hlaða inn skrám með endingunum {accept}.',
    description: 'Error message when file extension is invalid',
  },
  isMissingTokenErrorTitle: {
    id: 'application.system:core.missing.token.error.title',
    defaultMessage: 'Úps! Enginn tóki fannst',
    description: 'Oops! No token found',
  },
  isMissingTokenErrorDescription: {
    id: 'application.system:core.missing.token.error.description',
    defaultMessage: 'Ekki er hægt að tengja umsókn án auðkenningartóka',
    description: 'It is not possible to open an application without a token',
  },
  couldNotAssignApplicationErrorTitle: {
    id: 'application.system:could.not.assign.application.error.title',
    defaultMessage: 'Úps! Ekki tókst að tengjast umsókn',
    description: 'Oops! Could not assign to the application',
  },
  couldNotAssignApplicationErrorDescription: {
    id: 'application.system:could.not.assign.application.error.description',
    defaultMessage:
      'Villa koma upp við að tengjast umsókn og hefur hún verið skráð',
    description:
      'There are errors related to the application and it has been reported',
  },
  missingAnswer: {
    id: 'application.system:missing.answer',
    defaultMessage: 'Svar vantar',
    description: 'Copy when answer is missing',
  },
  failedDataProvider: {
    id: 'application.system:fetch.data.error',
    defaultMessage: 'Villa kom upp við að sækja gögn',
    description: 'Default error when dataprovider fails',
  },
  failedDataProviderSubmit: {
    id: 'application.system:fetch.data.failedDataProviderSubmit',
    defaultMessage: 'Eitthvað fór úrskeiðis',
    description:
      'Error message for dataprovider screen when one of the dataproviders fails',
  },
  paymentSubmitFailed: {
    id: 'application.system:core.payment.submitTitle',
    defaultMessage: 'Sending umsóknar mistókst',
    description: 'Message indicating submission after payment failed',
  },
  paymentSubmitRetryButtonCaption: {
    id: 'application.system:core.payment.retryCaption',
    defaultMessage: 'Reyna aftur',
    description: 'Caption for the retry button',
  },
  paymentStatusError: {
    id: 'application.system:core.payment.statusError',
    defaultMessage: 'Tókst ekki að sækja stöðu greiðslu',
    description: 'Message indicating failure to fetch payment status',
  },
  invalidNationalId: {
    id: 'application.system:core.payment.invalidNationalId',
    defaultMessage: 'Ógild kennitala',
    description: 'Message indicating national id is invalid',
  },
  invalidCompanySelectedTitle: {
    id: 'application.system:core.payment.invalidCompanySelectedTitle',
    defaultMessage: 'Þú mátt ekki velja þetta fyrirtæki',
    description:
      'Title error message when a user selects company on forbidden list',
  },
  invalidCompanySelectedMessage: {
    id: 'application.system:core.payment.invalidCompanySelectedMessage',
    defaultMessage: 'Þetta fyrirtæki er á bannlista, vinsamlegast veldu annað',
    description: 'Error message when a user selects company on forbidden list',
  },
  noCompanySearchResultsFoundTitle: {
    id: 'application.system:core.payment.noCompanySearchResultsFoundTitle',
    defaultMessage: 'Engar niðurstöður fundust hjá fyrirtækjaskrá',
    description: 'Title error message when no company search result is found',
  },
  noCompanySearchResultsFoundMessage: {
    id: 'application.system:core.payment.noCompanySearchResultsFoundMessage',
    defaultMessage: 'Vinsamlegast athugaðu hvort að rétt var slegið inn.',
    description: 'Error Message when no company search result is found',
  },
  nationalRegistryAgeLimitNotMetTitle: {
    id:
      'application.system:core.fetch.data.nationalRegistryAgeLimitNotMetTitle',
    defaultMessage: 'Þú hefur ekki náð tilskyldum aldri fyrir þessa umsókn',
    description:
      'Error Title when age restriciton from national registry is not met',
  },
  nationalRegistryAgeLimitNotMetSummary: {
    id:
      'application.system:core.fetch.data.nationalRegistryAgeLimitNotMetSummary',
    defaultMessage: 'Þú hefur ekki náð tilskyldum aldri fyrir þessa umsókn ',
    description:
      'Error message when age restriciton from national registry is not met',
  },
  drivingLicenseNoTeachingRightsTitle: {
    id:
      'application.system:core.fetch.data.drivingLicenseNoTeachingRightsTitle',
    defaultMessage: 'Þú hefur ekki ökukennararéttindi í ökuskírteinaskrá.',
    description: 'Driving License provider no teaching rights error',
  },
  drivingLicenseNoTeachingRightsSummary: {
    id:
      'application.system:core.fetch.data.drivingLicenseNoTeachingRightsSummary',
    defaultMessage:
      'Vinsamlega hafðu samband við næsta sýslumannsembætti ef þú telur um villu vera að ræða.',
    description: 'Driving License provider no teaching rights error',
  },
  drivingLicenseNotEmployeeTitle: {
    id: 'application.system:core.fetch.data.drivingLicenseNotEmployeeTitle',
    defaultMessage: 'Ekki fannst staðfesting á skráningarréttindum',
    description: 'Driving License provider no teaching rights error',
  },
  drivingLicenseNotEmployeeSummary: {
    id: 'application.system:core.fetch.data.drivingLicenseNotEmployeeSummary',
    defaultMessage:
      'Vinsamlega hafðu samband við Samgöngustofu til að athuga hvort þú hafir sannarlega réttindi til skráningar ökuskóla',
    description: 'Driving License provider no teaching rights error',
  },
  vehiclesEmptyListOwner: {
    id: 'application.system:core.fetch.data.vehiclesEmptyListOwner',
    defaultMessage: 'Þú átt engin ökutæki þar sem þú ert aðaleigandi',
    description: 'You do not have any vehicles where you are the main owner',
  },
  vehiclesEmptyListOwnerOrCoOwner: {
    id: 'application.system:core.fetch.data.vehiclesEmptyListOwnerOrCoOwner',
    defaultMessage:
      'Þú átt engin ökutæki þar sem þú ert aðaleigandi eða meðeigandi',
    description: 'You do not have any vehicles where you are the main owner',
  },
  vehiclesEmptyListDefault: {
    id: 'application.system:core.fetch.data.vehiclesEmptyListDefault',
    defaultMessage: 'Ekki fundust nein ökutæki',
    description: 'Did not find any vehicles',
  },
  drivingLicenseMissingValidCategory: {
    id: 'application.system:core.fetch.data.drivingLicenseMissingValidCategory',
    defaultMessage:
      'Þú ert ekki með nauðsynleg ökuréttindi til að sækja um þessa umsókn',
    description:
      'You do not have enough driving permission to apply for this application',
  },
  nationalRegistryLegalDomicileNotIceland: {
    id:
      'application.system:core.fetch.data.nationalRegistryLegalDomicileNotIceland',
    defaultMessage: 'Þú ert ekki með lögheimili á Íslandi',
    description: 'You do not have a domicile in Iceland',
  },
  nationalRegistryAgeNotValid: {
    id: 'application.system:core.fetch.data.nationalRegistryAgeNotValid',
    defaultMessage: 'Þú hefur ekki náð tilskyldum aldri fyrir þessa umsókn',
    description: 'You are not old enough to apply for this application',
  },
  nationalRegistryAgeNotValidDescription: {
    id:
      'application.system:core.fetch.data.nationalRegistryAgeNotValidDescription',
    defaultMessage: 'Þú hefur ekki náð tilskyldum aldri fyrir þessa umsókn',
    description: 'You are not old enough to apply for this application',
  },
  nationalRegistryBirthplaceMissing: {
    id: 'application.system:core.fetch.data.nationalRegistryBirthplaceMissing',
    defaultMessage: 'Náði ekki að sækja fæðingarstað',
    description: 'Not able to fetch birthplace',
  },

  applicationIsPrunedAndReadOnly: {
    id: 'application.system:core.fetch.data.applicationIsPrunedAndReadOnly',
    defaultMessage: 'Umsókn hefur runnið út á tíma og hefur verið gerð óvirk.',
    description: 'Application has been pruned and is not editable',
  },
  nationalIdNotFoundInNationalRegistryTitle: {
    id:
      'application.system:core.fetch.data.nationalIdNotFoundInNationalRegistryTitle',
    defaultMessage: 'Ekki tókst að sækja gögn úr Þjóðskrá',
    description: 'Not able to fetch data from national registry title',
  },
  nationalIdNotFoundInNationalRegistrySummary: {
    id:
      'application.system:core.fetch.data.nationalIdNotFoundInNationalRegistrySummary',
    defaultMessage:
      'Ekki tókst að sækja gögn úr Þjóðskrá fyrir þessa kennitölu.',
    description: 'Not able to fetch data from national registry description',
  },
})
export const coreDelegationsMessages = defineMessages({
  delegationScreenTitle: {
    id: 'application.system:core.delegations.delegationScreenTitle',
    defaultMessage: 'Umsóknaraðili',
    description: 'Delegations screen title',
  },
  delegationScreenSubtitle: {
    id: 'application.system:core.delegations.delegationScreenSubtitle',
    defaultMessage:
      'Hér getur þú valið fyrir hvaða einstakling þú vilt hefja umsókn fyrir.',
    description: 'Delegations screen subtitle for new application',
  },
  delegationActionCardText: {
    id: 'application.system:core.delegations.delegationActionCardText',
    defaultMessage: 'Kennitala: ',
    description: 'Delegations Screen Card Text',
  },
  delegationActionCardButton: {
    id: 'application.system:core.delegations.delegationActionCardButton',
    defaultMessage: 'Hefja umsókn',
    description: 'Delegations Screen Card Button/Link',
  },
  delegationScreenTitleForOngoingApplication: {
    id:
      'application.system:core.delegations.delegationScreenTitleForOngoingApplication',
    defaultMessage: 'Umsókn',
    description: 'Delegations screen title for ongoing application',
  },
  delegationScreenSubtitleForOngoingApplication: {
    id:
      'application.system:core.delegations.delegationScreenSubtitleForOngoingApplication',
    defaultMessage:
      'Hér getur þú haldið áfram umsókn fyrir viðkomandi aðila. Ef þú þarft að breyta umsóknaraðila skaltu hefja nýja umsókn.',
    description: 'Delegations screen subtitle for ongoing application',
  },
  delegationScreenNationalId: {
    id: 'application.system:core.delegations.delegationScreenNationalId',
    defaultMessage: 'Kennitala: ',
    description: 'Delegations screen national Id',
  },
  delegationScreenTitleApplicationNoDelegationSupport: {
    id:
      'application.system:core.delegations.delegationScreenTitleApplicationNoDelegationSupport',
    defaultMessage: 'Umsókn styður ekki umboð',
    description:
      'Delegations error application does not support delegations title',
  },
  delegationScreenSubtitleApplicationNoDelegationSupport: {
    id:
      'application.system:core.delegations.delegationScreenSubtitleApplicationNoDelegationSupport',
    defaultMessage: 'Vinsamlegast skiptu um notanda til að halda áfram.',
    description:
      'Delegations error application does not support delegations title',
  },
  delegationErrorButton: {
    id: 'application.system:core.delegations.delegationErrorButton',
    defaultMessage: 'Skipta um notanda',
    description: 'Delegations Screen Card Button/Link',
  },
})

export const coreErrorScreenMessages = defineMessages({
  notFoundTitle: {
    id: 'application.system:core.errorScreen.notFoundTitle',
    defaultMessage: 'Umsókn fannst ekki',
    description: 'Error screen title',
  },
  notFoundSubTitle: {
    id: 'application.system:core.errorScreen.notFoundSubTitle',
    defaultMessage:
      'Eftirfarandi ástæður geta verið fyrir því að umsóknin fannst ekki',
    description: 'Error screen subtitle',
  },
  notFoundDescription: {
    id: 'application.system:core.errorScreen.notFoundDescription#markdown',
    defaultMessage: `* Þú ert á rangri slóð\n`,
    description: 'Error screen description',
  },
  forbiddenTitle: {
    id: 'application.system:core.errorScreen.forbiddenTitle',
    defaultMessage: 'Þú hefur ekki aðgang að viðkomandi umsókn',
    description: 'Error screen title',
  },
  forbiddenSubTitle: {
    id: 'application.system:core.errorScreen.forbiddenSubTitle',
    defaultMessage:
      'Eftirfarandi ástæður geta verið fyrir því að umsóknin fannst ekki',
    description: 'Error screen subtitle',
  },
  forbiddenDescription: {
    id: 'application.system:core.errorScreen.forbiddenDescription#markdown',
    defaultMessage: `* Þú ert ekki með aðgang að umsókninni\n* Umsóknin er full kláruð`,
    description: 'Error screen description',
  },
  notExistTitle: {
    id: 'application.system:core.errorScreen.notExistTitle',
    defaultMessage: 'Umsóknartegund ekki til',
    description: 'Error screen title',
  },
  notExistSubTitle: {
    id: 'application.system:core.errorScreen.notExistSubTitle',
    defaultMessage:
      'Eftirfarandi ástæður geta verið fyrir því að umsóknin fannst ekki',
    description: 'Error screen subtitle',
  },
  notExistDescription: {
    id: 'application.system:core.errorScreen.notExistDescription#markdown',
    defaultMessage: `* Þú ert á rangri slóð\n`,
  },
  lostTitle: {
    id: 'application.system:core.errorScreen.lostTitle',
    defaultMessage: 'Umsókn týnd - Ekki til',
    description: 'Error screen title',
  },
  lostSubTitle: {
    id: 'application.system:core.errorScreen.lostSubTitle',
    defaultMessage:
      'Eftirfarandi ástæður geta verið fyrir því að umsóknin fannst ekki',
    description: 'Error screen subtitle',
  },
  lostDescription: {
    id: 'application.system:core.errorScreen.lostDescription#markdown',
    defaultMessage: `* Umsókn hefur verið fjarlægð\n* Umsókn rann út á tíma\n`,
    description: 'Error screen description',
  },
  buttonNewApplication: {
    id: 'application.system:core.errorScreen.buttonNew',
    defaultMessage: 'Byrja nýja umsókn',
    description: 'Error screen button',
  },
  buttonMyApplications: {
    id: 'application.system:core.errorScreen.buttonMyApplications',
    defaultMessage: 'Fara í þínar umsóknir',
    description: 'Error screen button',
  },
  application: {
    id: 'application.system:core.errorScreen.application',
    defaultMessage: 'Umsókn',
    description: 'Error screen application',
  },
})
