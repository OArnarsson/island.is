import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  foundSingular: {
    id: 'sp.documents:found-singular',
    defaultMessage: 'skjal fannst',
  },
  found: {
    id: 'sp.documents:found',
    defaultMessage: 'skjöl fundust',
  },
  title: {
    id: 'sp.documents:title',
    defaultMessage: 'Pósthólf',
  },
  intro: {
    id: 'sp.documents:intro',
    defaultMessage:
      'Hér getur þú fundið skjöl sem send hafa verið til þín frá opinberum aðilum.',
  },
  onlyShowUnread: {
    id: 'sp.documents:only-show-unread',
    defaultMessage: 'Sýna einungis ólesið',
  },
  onlyShowUnreadShort: {
    id: 'sp.documents:only-show-unread-short',
    defaultMessage: 'Sýna ólesið',
  },
  institutionLabel: {
    id: 'sp.documents:institution-label',
    defaultMessage: 'Stofnun',
  },
  groupLabel: {
    id: 'sp.documents:group-label',
    defaultMessage: 'Flokkur',
  },
  clearFilters: {
    id: 'sp.documents:clear-filters',
    defaultMessage: 'Hreinsa síu',
  },
  tableHeaderDate: {
    id: 'sp.documents:table-header-date',
    defaultMessage: 'Dagsetning',
  },
  tableHeaderInformation: {
    id: 'sp.documents:table-header-information',
    defaultMessage: 'Upplýsingar',
  },
  tableHeaderInstitution: {
    id: 'sp.documents:table-header-institution',
    defaultMessage: 'Stofnun',
  },
  tableHeaderGroup: {
    id: 'sp.documents:table-header-group',
    defaultMessage: 'Flokkur',
  },
  notFound: {
    id: 'sp.documents:not-found',
    defaultMessage: 'Engin skjöl fundust fyrir gefin leitarskilyrði.',
  },
  error: {
    id: 'sp.documents:error',
    defaultMessage: 'Tókst ekki að sækja rafræn skjöl, eitthvað fór úrskeiðis.',
  },
  documentFetchError: {
    id: 'sp,documents:fetch-error',
    defaultMessage:
      'Ekki tókst að sækja umbeðið skjal, við bendum þér á að beina fyrirspurn til sendanda þess, {senderName}',
  },
})
