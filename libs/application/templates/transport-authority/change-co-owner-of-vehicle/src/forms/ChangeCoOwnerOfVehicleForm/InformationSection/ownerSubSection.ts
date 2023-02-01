import {
  buildMultiField,
  buildTextField,
  buildSubSection,
  buildDescriptionField,
  buildCustomField,
} from '@island.is/application/core'
import { information } from '../../../lib/messages'
import { Application } from '@island.is/api/schema'

export const ownerSubSection = buildSubSection({
  id: 'owner',
  title: information.labels.owner.sectionTitle,
  children: [
    buildMultiField({
      id: 'ownerMultiField',
      title: information.labels.owner.title,
      description: information.labels.owner.description,
      children: [
        buildDescriptionField({
          id: 'owner.mainOwner',
          title: information.labels.owner.subtitle,
          titleVariant: 'h5',
        }),
        buildTextField({
          id: 'owner.nationalId',
          title: information.labels.owner.nationalId,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          format: '######-####',
          defaultValue: (application: Application) =>
            application.externalData?.nationalRegistry?.data?.nationalId,
        }),
        buildTextField({
          id: 'owner.name',
          title: information.labels.owner.name,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) =>
            application.externalData?.nationalRegistry?.data?.fullName,
        }),
        buildTextField({
          id: 'owner.email',
          title: information.labels.owner.email,
          width: 'half',
          variant: 'email',
          required: true,
          defaultValue: (application: Application) =>
            application.externalData?.userProfile?.data?.email,
        }),
        buildTextField({
          id: 'owner.phone',
          title: information.labels.owner.phone,
          width: 'half',
          variant: 'tel',
          format: '###-####',
          required: true,
          defaultValue: (application: Application) =>
            application.externalData?.userProfile?.data?.phone,
        }),
        buildCustomField({
          id: 'ownerCoOwners',
          title: '',
          component: 'CoOwner',
          doesNotRequireAnswer: true,
        }),
      ],
    }),
  ],
})
