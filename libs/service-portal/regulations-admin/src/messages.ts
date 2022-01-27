import { defineMessages, MessageDescriptor } from 'react-intl'
import { DraftingStatus } from '@island.is/regulations/admin'

export const editorMsgs = defineMessages({
  stepContentHeadline: {
    id: 'ap.regulations-admin:draft-step_content-headline',
    defaultMessage: 'Texti reglugerðarinnar',
  },
  stepMetaHeadline: {
    id: 'ap.regulations-admin:draft-step_meta2-headline',
    defaultMessage: 'Skráning lýsigagna',
  },
  stepSignatureHeadline: {
    id: 'ap.regulations-admin:draft-step_impact-headline',
    defaultMessage: 'Undirritun ráðherra',
  },
  stepSignatureIntro: {
    id: 'ap.regulations-admin:draft-step3-intro',
    defaultMessage:
      'Hér hlaða upp eintaki af reglugerðinni með undirritun ráðherra. Það skjal verður að lokum framsent til Stjórnartíðinda.',
  },
  stepImpactHeadline: {
    id: 'ap.regulations-admin:draft-step_impact-headline',
    defaultMessage: 'Áhrif á aðrar reglugerðir',
  },
  stepImpactIntro: {
    id: 'ap.regulations-admin:draft-step3-intro',
    defaultMessage:
      'Hér er skráð hvaða reglugerðir falla brott og hvaða stofnreglugerðir taka efnislegum breytingum og texti þeirra uppfærður.',
  },
  stepReviewHeadline: {
    id: 'ap.regulations-admin:draft-step_review-headline',
    defaultMessage: 'Staðfesting fyrir útgáfu í Stjórnartíðindum',
  },
  stepReviewIntro: {
    id: 'ap.regulations-admin:draft-step_review-intro',
    defaultMessage:
      'Vinsamlega yfirfarið að allar skráðar upplýsingar séu réttar',
  },

  title: {
    id: 'ap.regulations-admin:draft-labels-title',
    defaultMessage: 'Titill reglugerðar',
  },

  text: {
    id: 'ap.regulations-admin:draft-labels-text',
    defaultMessage: 'Texti reglugerðar',
  },

  appendix_legend: {
    id: 'ap.regulations-admin:draft-appendix-legend',
    defaultMessage: 'Viðauki {idx}',
  },
  appendix_legend_revoked: {
    id: 'ap.regulations-admin:draft-appendix-legend-revoked',
    defaultMessage: 'Fjarlægður viðauki',
  },
  appendix_revoked_message: {
    id: 'ap.regulations-admin:draft-appendix-revoked-message',
    defaultMessage: 'Eldri viðauki felldur burt.',
  },
  appendix_revoked_undo: {
    id: 'ap.regulations-admin:draft-appendix-revoked-undo',
    defaultMessage: 'Afturkalla',
  },
  appendix_title: {
    id: 'ap.regulations-admin:draft-labels-appendix-title',
    defaultMessage: 'Heiti viðauka',
  },
  appendix_text: {
    id: 'ap.regulations-admin:draft-labels-appendix-title',
    defaultMessage: 'Texti viðauka',
  },
  appendix_open: {
    id: 'ap.regulations-admin:draft-btn-appendix-open',
    defaultMessage: 'Sýna',
  },
  appendix_close: {
    id: 'ap.regulations-admin:draft-btn-appendix-close',
    defaultMessage: 'Loka',
  },
  appendix_add: {
    id: 'ap.regulations-admin:draft-btn-appendix-add',
    defaultMessage: 'Bæta við viðauka',
  },
  appendix_remove: {
    id: 'ap.regulations-admin:draft-btn-appendix-remove',
    defaultMessage: 'Eyða viðauka {idx}',
  },
  appendix_remove_short: {
    id: 'ap.regulations-admin:draft-btn-appendix-remove-short',
    defaultMessage: 'Eyða',
  },
  appendix_remove_confirm: {
    id: 'ap.regulations-admin:draft-appendix-remove-confirm',
    defaultMessage: 'Eyða endanlega viðauka {idx}?',
  },
  appendix_shiftup: {
    id: 'ap.regulations-admin:draft-btn-appendix-shiftup',
    defaultMessage: 'Færa viðauka {idx} framar í röðinni',
  },
  appendix_shiftup_short: {
    id: 'ap.regulations-admin:draft-btn-appendix-shiftup-short',
    defaultMessage: 'Færa upp',
  },

  comments: {
    id: 'ap.regulations-admin:draft-labels-comments',
    defaultMessage: 'Athugasemdir ritstjóra',
  },
  comments_add: {
    id: 'ap.regulations-admin:draft-labels-comments-add',
    defaultMessage: 'Skrá athugasemdir ritstjóra',
  },

  author_legened: {
    id: 'ap.regulations-admin:draft-legend-author',
    defaultMessage: 'Höfundur/tengiliður',
  },
  author_legened__plural: {
    id: 'ap.regulations-admin:draft-legend-author--plural',
    defaultMessage: 'Höfundar/tengiliðir',
  },
  author: {
    id: 'ap.regulations-admin:draft-legend-author',
    defaultMessage: 'Kennitala / netfang',
  },
  author_add: {
    id: 'ap.regulations-admin:draft-btn-author-add',
    defaultMessage: 'Nýr tengiliður',
  },
  author_remove: {
    id: 'ap.regulations-admin:draft-btn-author-remove',
    defaultMessage: 'Eyða tengilið',
  },

  draftingNotes: {
    id: 'ap.regulations-admin:draft-labels-draftingnotes',
    defaultMessage: 'Minnispunktar / Skilaboð',
  },
  draftingNotes_descr: {
    id: 'ap.regulations-admin:draft-description-draftingnotes',
    defaultMessage:
      '(Ekki partur af reglugerðinni, aðeins til hliðsjónar í útgáfuferlinu.)',
  },

  idealPublishDate: {
    id: 'ap.regulations-admin:draft-labels-idealpublishdate',
    defaultMessage: 'Ósk um útgáfudag',
  },
  idealPublishDate_default: {
    id: 'ap.regulations-admin:draft-opts-idealpublishdate-default',
    defaultMessage: 'Við fyrsta tækifæri',
  },
  idealPublishDate_fastTrack: {
    id: 'ap.regulations-admin:draft-otps-idealpublishdate-fasttrack',
    defaultMessage: '(hraðbirting)',
  },
  applyForFastTrack: {
    id: 'ap.regulations-admin:apply-for-fasttrack',
    defaultMessage: 'Sækja um flýtimeðferð',
  },

  ministry: {
    id: 'ap.regulations-admin:draft-labels-ministry',
    defaultMessage: 'Ráðuneyti',
  },
  ministryPlaceholder: {
    id: 'ap.regulations-admin:draft-placeholder-ministry',
    defaultMessage: 'Lesið úr undirritun reglugerðar',
  },

  lawChapter: {
    id: 'ap.regulations-admin:draft-labels-lawchapter',
    defaultMessage: 'Kaflar í lagasasfni',
  },
  lawChapterPlaceholder: {
    id: 'ap.regulations-admin:draft-labels-choose-ministry',
    defaultMessage: 'Veldu kafla',
  },
  lawChapter_add: {
    id: 'ap.regulations-admin:draft-btn-lawchapter-add',
    defaultMessage: 'Bæta við kafla',
  },
  lawChapter_remove: {
    id: 'ap.regulations-admin:draft-btn-lawchapter-remove',
    defaultMessage: 'Fjarlægja kafla',
  },

  signatureDate: {
    id: 'ap.regulations-admin:draft-labels-signaturedate',
    defaultMessage: 'Undirritunardagur',
  },
  signatureDatePlaceholder: {
    id: 'ap.regulations-admin:draft-placeholder-signaturedate',
    defaultMessage: 'Lesin úr undirritun reglugerðar',
  },

  signatureText: {
    id: 'ap.regulations-admin:draft-labels-signaturetext',
    defaultMessage: 'Texti undirritunarkafla',
  },

  signedDocumentDownloadFresh: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-download',
    defaultMessage: 'Sækja PDF til undirritunar',
  },
  signedDocumentUpload: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-upload',
    defaultMessage: 'Hlaða upp undirrituðu eintaki',
  },
  signedDocumentUploadDragPrompt: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-dragprompt',
    defaultMessage: 'Dragðu undirritað PDF skjal hingað …',
  },
  signedDocumentUploadDescr: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-description',
    defaultMessage: ' ', // 'Leyfileg skráarsnið: PDF'
  },
  signedDocumentClear: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-clear',
    defaultMessage: 'Eyða skjali',
  },
  signedDocumentClearLong: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-clearlong',
    defaultMessage: 'Eyða undirrituðu skjali',
  },
  signedDocumentClearUndo: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-clear-undo',
    defaultMessage: 'Afturkalla eyðingu.',
  },
  signedDocumentLink: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-view',
    defaultMessage: 'Skoða skjal',
  },
  signedDocumentLinkLong: {
    id: 'ap.regulations-admin:draft-labels-signeddocument-viewlong',
    defaultMessage: 'Skoða undirritað skjal',
  },

  effectiveDate: {
    id: 'ap.regulations-admin:draft-labels-effectivedate',
    defaultMessage: 'Gildistökudagur',
  },
  effectiveDate_default: {
    id: 'ap.regulations-admin:draft-opts-effectivedate-default',
    defaultMessage: 'Tekur þegar gildi', // 'Á útgáfudegi'
  },

  type: {
    id: 'ap.regulations-admin:draft-labels-type',
    defaultMessage: 'Tegund reglugerðar',
  },
  typePlaceholder: {
    id: 'ap.regulations-admin:draft-labels-type',
    defaultMessage: 'Stýrist af titli reglugerðarinnar',
  },
  type_base: {
    id: 'ap.regulations-admin:draft-opts-type-base',
    defaultMessage: 'Stofnreglugerð',
  },
  type_amending: {
    id: 'ap.regulations-admin:draft-opts-type-amending',
    defaultMessage: 'Breytingareglugerð',
  },

  cancellation_add: {
    id: 'ap.regulations-admin:draft-btn-cancellation-add',
    defaultMessage: 'Ný brottfelling',
  },
  change_add: {
    id: 'ap.regulations-admin:draft-btn-change-add',
    defaultMessage: 'Ný texta-/ákvæðabreyting',
  },

  impactRegExplainer: {
    id: 'ap.regulations-admin:draft-impactedreg-explainer',
    defaultMessage:
      'ATH: Einungis er hægt að breyta reglugerðum sem minnst er á með skýrum hætti í texta reglugerðarinnar.',
  },
  impactRegExplainer_editLink: {
    id: 'ap.regulations-admin:draft-impactedreg-editlink',
    defaultMessage: 'Endurskoða textann',
  },

  impactRegSelect: {
    id: 'ap.regulations-admin:draft-label-impactedreg',
    defaultMessage: 'Reglugerð sem breytist',
  },
  impactRegSelect_mentionedNotFound: {
    id: 'ap.regulations-admin:draft-opts-mentionednotfound',
    defaultMessage: 'er ekki reglugerð',
  },
  impactRegSelect_mentionedRepealed: {
    id: 'ap.regulations-admin:draft-opts-mentionedrepealed',
    defaultMessage: 'brottfallin',
  },
  impactRegSelect_placeholder: {
    id: 'ap.regulations-admin:draft-opts-impactedreg_placeholder',
    defaultMessage: 'Veldu reglugerð',
  },
  impactEffectiveDate: {
    id: 'ap.regulations-admin:draft-labels-impacteffectivedate',
    defaultMessage: 'Gildistaka breytinga',
  },
  impactEffectiveDate_default: {
    id: 'ap.regulations-admin:draft-opts-impacteffectivedate-default',
    defaultMessage: 'Tekur þegar gildi', // 'Á útgáfudegi'
  },
  impactEffectiveDate_toosoon: {
    id: 'ap.regulations-admin:draft-opts-impacteffectivedate-toosoon',
    defaultMessage: 'Breytingar geta ekki tekið gildi á undan reglugerðinni', // 'Á útgáfudegi'
  },

  chooseImpactType: {
    id: 'ap.regulations-admin:draft-legend-impacttype',
    defaultMessage: 'Hvað viltu gera við reglugerðina?',
  },
  chooseImpactType_cancel: {
    id: 'ap.regulations-admin:draft-legend-impacttype-cancel',
    defaultMessage: 'Fella hana brott',
  },
  chooseImpactType_change: {
    id: 'ap.regulations-admin:draft-legend-impacttype-change',
    defaultMessage: 'Gera textabreytingar',
  },
  chooseImpactType_or: {
    id: 'ap.regulations-admin:draft-legend-impacttype-or',
    defaultMessage: 'eða',
  },

  cancallation_save: {
    id: 'ap.regulations-admin:draft-btn-cancallation-save',
    defaultMessage: 'Vista brottfellingu',
  },
  change_save: {
    id: 'ap.regulations-admin:draft-btn-change-save',
    defaultMessage: 'Vista brottfellingu',
  },
  impact_cancel: {
    id: 'ap.regulations-admin:draft-btn-impact-cancel',
    defaultMessage: 'Hætta við',
  },
  impact_remove: {
    id: 'ap.regulations-admin:draft-btn-impact-remove',
    defaultMessage: 'Eyða áhrifafærslu',
  },
  change_edit: {
    id: 'ap.regulations-admin:draft-btn-change-edit',
    defaultMessage: 'Breyta breytingafærslu',
  },

  cancelledRegulation: {
    id: 'ap.regulations-admin:draft-label-cancelledregulation',
    defaultMessage: 'Reglugerð sem fellur brott',
  },
  changedRegulation: {
    id: 'ap.regulations-admin:draft-label-changedregulation',
    defaultMessage: 'Stofnreglugerð sem breytist',
  },
  impactDate: {
    id: 'ap.regulations-admin:draft-label-impactdate',
    defaultMessage: 'Gildistökudagur',
  },

  changedTitle: {
    id: 'ap.regulations-admin:draft-label-changedtitle',
    defaultMessage: 'Nýr titill reglugerðar',
  },
  changedText: {
    id: 'ap.regulations-admin:draft-legend-changedtitle',
    defaultMessage: 'Uppfærður texti reglugerðar',
  },

  impactSelfAffecting: {
    id: 'ap.regulations-admin:draft-label-impact-selfaffecting',
    defaultMessage: 'Hefur áhrif á sjálfa sig',
  },
})

export const errorMsgs = defineMessages({
  typeRequired: {
    id: 'ap.regulations-admin:error-typefield-required',
    defaultMessage: 'Ekki hægt að greina tegund reglugerðar út frá titli',
  },
  fieldRequired: {
    id: 'ap.regulations-admin:error-field-required',
    defaultMessage: 'Þessi reitur má ekki vera tómur',
  },
  ministryUnknown: {
    id: 'ap.regulations-admin:error-ministry-unknown',
    defaultMessage: 'Nafn ráðuneytis er óþekkt',
  },
  impactMissing: {
    id: 'ap.regulations-admin:error-impactmissing',
    defaultMessage:
      'Breytingareglugerð verður í það minnsta að fella eina reglugerð úr gildi eða breyta ákvæðum hennar.',
  },
  impactingUnMentioned: {
    id: 'ap.regulations-admin:error-impact-unmentioned',
    defaultMessage:
      'Hvergi er minnst á þessa reglugerð í texta nýju reglugerðarinnar.',
  },
})

export const homeMessages = defineMessages({
  title: {
    id: 'ap.regulations-admin:home-title',
    defaultMessage: 'Vinnslusvæði reglugerða',
  },
  intro: {
    id: 'ap.regulations-admin:home-intro',
    defaultMessage:
      '…fyrir lögformlega útgáfu í Stjórnartíðindum og endurbirtingu í reglugerðasafni.',
  },

  taskListTitle: {
    id: 'ap.regulations-admin:tasklist-title',
    defaultMessage: 'Reglugerðir í vinnslu',
  },
  shippedTitle: {
    id: 'ap.regulations-admin:shipped-title',
    defaultMessage: 'Reglugerðir sem bíða formlegrar birtingar',
  },
  createRegulation: {
    id: 'ap.regulations-admin:create-regulation-cta',
    defaultMessage: 'Skrá nýja reglugerð',
  },
  taskList_draftTitleMissing: {
    id: 'ap.regulations-admin:tasklist-draft-title-missing',
    defaultMessage: '—  ónefnd drög  —',
  },

  cta: {
    id: 'ap.regulations-admin:task-cta',
    defaultMessage: 'Halda áfram',
  },

  publishSoon: editorMsgs.idealPublishDate_default,
  publishFastTrack: editorMsgs.idealPublishDate_fastTrack,
  publishToday: {
    id: 'ap.regulations-admin:idealpublishdate-today',
    defaultMessage: 'Í dag',
  },
})

export const ministryMessages = defineMessages({
  title: {
    id: 'ap.regulations-admin:ministry-title',
    defaultMessage: 'Skráning ráðuneyta',
  },
  intro: {
    id: 'ap.regulations-admin:ministry-intro',
    defaultMessage: 'Umsýsla og skráning ráðuneyta er góð skemmtun.',
  },
  cta: {
    id: 'ap.regulations-admin:ministry-cta',
    defaultMessage: 'Breyta',
  },
})

export const statusMsgs: Record<
  DraftingStatus,
  MessageDescriptor
> = defineMessages({
  draft: {
    id: 'ap.regulations-admin:status-draft',
    defaultMessage: 'Drög',
  },
  proposal: {
    id: 'ap.regulations-admin:status-proposal',
    defaultMessage: 'Tilbúið í yfirlestur',
  },
  shipped: {
    id: 'ap.regulations-admin:status-shipped',
    defaultMessage: 'Bíður birtingar',
  },
  published: {
    id: 'ap.regulations-admin:status-published',
    defaultMessage: 'Birt',
  },
})

export const buttonsMsgs = defineMessages({
  continue: {
    id: 'ap.regulations-admin:btn-continue',
    defaultMessage: 'Halda áfram', // Næsta skref
  },
  goBack: {
    id: 'ap.regulations-admin:btn-back',
    defaultMessage: 'Til baka',
  },
  save: {
    id: 'ap.regulations-admin:btn-savestatus',
    defaultMessage: 'Vista stöðu',
  },
  saveSuccess: {
    id: 'ap.regulations-admin:btn-savestatus-success',
    defaultMessage: 'Staða vistuð',
  },
  saveFailure: {
    id: 'ap.regulations-admin:btn-savestatus-failure',
    defaultMessage: 'Ekki tókst að vista',
  },
  propose: {
    id: 'ap.regulations-admin:btn-propose',
    defaultMessage: 'Senda í yfirlestur',
  },
  prepShipping: {
    id: 'ap.regulations-admin:btn-prepshipping',
    defaultMessage: 'Hefja útgáfuferli',
  },
  publish: {
    id: 'ap.regulations-admin:btn-publish',
    defaultMessage: 'Senda til útgáfu í stjórnartíðindum',
  },
  delete: {
    id: 'ap.regulations-admin:btn-delete',
    defaultMessage: 'Eyða færslu',
  },
  confirmDelete: {
    id: 'ap.regulations-admin:btn-delete-confirm',
    defaultMessage: 'Þessu uppkasti að reglugerð verður eytt varanlega!',
  },
})

export const reviewMessagse = defineMessages({
  confirmBeforePublish: {
    id: 'ap.regulations-admin:btn-continue',
    defaultMessage: 'Ég hef yfirfarið að reglugerðin sé rétt skráð',
  },
})
