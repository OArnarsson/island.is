import { defineMessages } from 'react-intl'

export const whoIsTheNotificationFor = {
  general: defineMessages({
    sectionTitle: {
      id: 'an.application:whoIsTheNotificationFor.sectionTitle',
      defaultMessage: 'Fyrir hvern ertu að tilkynna slys?',
      description: 'Section title for who is the notifaction for',
    },
    heading: {
      id: 'an.application:whoIsTheNotificationFor.heading',
      defaultMessage: 'Fyrir hvern ertu að tilkynna slys?',
      description: 'Heading for who is the notifaction for',
    },
    description: {
      id: 'an.application:whoIsTheNotificationFor.description',
      defaultMessage: `Hægt er að tilkynna slys  í eigin nafni, fyrir aðra einstaklinga sem þú ert með skriflegt umboð 
				frá eða fyrir starfsmann sem þú hefur umsjá yfir.
			 	Foreldrar og forráðamenn geta líka sent inn tilkynningu fyrir hönd barna sem þeir fara með forsjá yfir. 
				Stofnanir, samtök og félög sem eru virk á sviði persónuverndar geta einnig sent inn
				tilkynningu án umboðs að uppfylltum skilyrðum 80. gr. reglugerðar (ESB) 2016/679 (almennu persónuverndarreglugerðarinnar).`,
      description: 'Heading for who is the notifaction for',
    },
  }),
  labels: defineMessages({
    juridicalPerson: {
      id: 'an.application:whoIsTheNotificationFor.labels.juridicalPerson',
      defaultMessage: 'Fyrir lögaðila',
      description: 'Label for juridical person option',
    },
    me: {
      id: 'an.application:whoIsTheNotificationFor.labels.me',
      defaultMessage: 'Mig',
      description: 'Label for me option',
    },
    powerOfAttorney: {
      id: 'an.application:whoIsTheNotificationFor.labels.powerOfAttorney',
      defaultMessage: 'Í umboði fyrir annan einstakling',
      description: 'Label for power of attorney option',
    },
  }),
}
