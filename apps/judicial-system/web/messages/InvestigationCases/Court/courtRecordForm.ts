import { defineMessages } from 'react-intl'

export const icCourtRecord = {
  sections: {
    sessionBookings: defineMessages({
      title: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.title',
        defaultMessage: 'Bókanir fyrir úrskurð',
        description:
          'Notaður sem titill fyrir "Bókarnir fyrir úrskurð" hlutann í rannsóknarheimildum.',
      },
      label: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.label',
        defaultMessage: 'Afstaða varnaraðila, málflutningur og aðrar bókanir',
        description:
          'Notaður sem titill í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      placeholder: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.placeholder',
        defaultMessage:
          'Nánari útlistun á afstöðu sakbornings, málflutningsræður og annað sem fram kom í þinghaldi er skráð hér...',
        description:
          'Notaður sem skýritexti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      tooltip: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.tooltip-2',
        defaultMessage:
          'Hér er hægt að bóka í þingbók um réttindi og afstöðu varnaraðila, ásamt bókunum t.d. um verjanda og túlk. Auk þess er málflutningur bókaður hér',
        description:
          'Notaður sem upplýsingatexti í upplýsingasvæði við "Afstaða varnaraðila, málflutningur og aðrar bókanir" svæðið í rannsóknarheimildum.',
      },
      autofillRightToRemainSilent: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_right_to_remain_silent',
        defaultMessage:
          'Varnaraðila er bent á að honum sé óskylt að svara spurningum er varða brot það sem honum er gefið að sök, sbr. 2. mgr. 113. gr. laga nr. 88/2008. Sakborningur er enn fremur áminntur um sannsögli kjósi hann að tjá sig um sakarefnið, sbr. 1. mgr. 114. gr. sömu laga.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      autofillCourtDocumentOne: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_court_document_one',
        defaultMessage: 'Varnaraðila er kynnt krafa á dómskjali nr. 1.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      autofillAccusedPlea: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_accused_plea',
        defaultMessage:
          'Varnaraðili mótmælir kröfunni / Varnaraðili samþykkir kröfuna',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      autofillAllPresent: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_all_present',
        defaultMessage:
          'Sækjanda og verjanda varnaraðila er gefinn kostur á að tjá sig um kröfuna. Verjandi krefst þess að kröfunni verði hafnað.\n\nMálið er tekið til úrskurðar.\n\nÍ málinu er kveðinn upp úrskurður.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í rannsóknarheimildum þegar varnaraðili mætir.',
      },
      autofillDefender: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_defender',
        defaultMessage:
          '{defender} lögmaður er skipaður verjandi varnaraðila að hans ósk.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í gæsluvarðhalds- og farbannsmálum.',
      },
      autofillTranslator: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_translator',
        defaultMessage:
          '{translator} túlkar fyrir varnaraðila það sem fram fer í þinghaldinu.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í gæsluvarðhalds- og farbannsmálum.',
      },
      autofillSpokeperson: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_spokeperson',
        defaultMessage:
          'Dómari hefur fallist á að krafan hljóti meðferð fyrir dómi án þess að varnaraðili verði kvaddur/kvödd á dómþing, sbr. 1. mgr. 104. gr. laga nr. 88/2008.\n\nSækjanda og talsmanni varnaraðila er gefinn kostur á að tjá sig um kröfuna. Talsmaður varnaraðila mótmælir kröfunni og krefst þess að kröfunni verði hafnað en til vara að aðgerðinni verði markaður skemmri tími. Þá krefst talsmaður þóknunar fyrir sín störf.\n\nMálið er tekið til úrskurðar.\n\nÍ málinu er kveðinn upp úrskurður.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í gæsluvarðhalds- og farbannsmálum.',
      },
      autofillProsecutor: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_prosecutor',
        defaultMessage:
          'Dómari hefur fallist á að krafan hljóti meðferð fyrir dómi án þess að varnaraðili verði kvaddur/kvödd á dómþing, sbr. 1. mgr. 104. gr. laga nr. 88/2008.\n\nSækjanda er gefinn kostur á að tjá sig um kröfuna.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í gæsluvarðhalds- og farbannsmálum þegar varnaraðili er ekki kvaddur fyrir dómþing.',
      },
      autofillRestrainingOrder: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_restraining_order',
        defaultMessage:
          'Sækjanda, réttargæslumanni og verjanda varnaraðila  er gefinn kostur á að tjá sig um kröfuna. Verjandi krefst þess að kröfunni verði hafnað en til vara að nálgunnarbanni verði markaður skemmri tími. Þá krefjast verjandi og réttargæslumaður þóknunar sér til handa.\n\nMálið er tekið til úrskurðar.\n\nÍ málinu er kveðinn upp úrskurður.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í nálgunarbannsmálum.',
      },
      autofillAutopsy: {
        id:
          'judicial.system.investigation_cases:court_record.session_bookings.autofill_autopsy',
        defaultMessage:
          'Ekki er sótt þing af hálfu varnaraðila.\n\nSækjanda er gefinn kostur á að tjá sig um kröfuna.\n\nMálið er tekið til úrskurðar.\n\nÍ málinu er kveðinn upp úrskurður.',
        description:
          'Sjálfgefinn texti í "Afstaða varnaraðila, málflutningur og aðrar bókanir" textaboxi á þingbókar skrefi í krufningarmálum.',
      },
    }),
    courtLocation: defineMessages({
      label: {
        id:
          'judicial.system.investigation_cases:court_record.court_location.label',
        defaultMessage: 'Hvar var dómþing haldið?',
        description:
          'Notaður sem titill í "Hvar var dómþing haldið?" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      placeholder: {
        id:
          'judicial.system.investigation_cases:court_record.court_location.placeholder',
        defaultMessage:
          'Staðsetning þinghalds, t.d. "í Héraðsdómi Reykjavíkur"',
        description:
          'Notaður sem skýritexti í "Hvar var dómþing haldið?" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      tooltip: {
        id:
          'judicial.system.investigation_cases:court_record.court_location.tooltip',
        defaultMessage:
          'Sláðu inn staðsetningu dómþings í þágufalli með forskeyti sem hefst á litlum staf. Dæmi "í Héraðsdómi Reykjavíkur". Staðsetning mun birtast með þeim hætti í upphafi þingbókar.',
        description:
          'Notaður sem upplýsingatexti í "Hvar var dómþing haldið?" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
    }),
    courtDocuments: defineMessages({
      header: {
        id:
          'judicial.system.investigation_cases:court_record.court_documents.header',
        defaultMessage: 'Dómskjöl',
        description:
          'Notað sem fyrirsögn í "Dómskjöl" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      tag: {
        id:
          'judicial.system.investigation_cases:court_record.court_documents.tag',
        defaultMessage: 'Þingmerkt nr. 1',
        description:
          'Notað sem tagg í "Dómskjöl" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
      text: {
        id:
          'judicial.system.investigation_cases:court_record.court_documents.text',
        defaultMessage: 'Rannsóknargögn málsins liggja frammi.',
        description:
          'Notað sem útskýringar texti í "Dómskjöl" textaboxi á þingbókar skrefi í rannsóknarheimildum.',
      },
    }),
  },
}
