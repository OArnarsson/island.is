import {
  buildForm,
  buildSection,
  buildDescriptionField,
  buildSubmitField,
  buildMultiField,
} from '@island.is/application/core'
import { Form, FormModes } from '@island.is/application/types'
import { draft } from '../lib/messages'

export const draftForm: Form = buildForm({
  id: 'DraftForm',
  title: draft.formTitle,
  mode: FormModes.NOT_STARTED,
  renderLastScreenButton: true,
  children: [
    buildSection({
      id: 'draftSection',
      title: draft.sectionTitle,
      children: [
        buildMultiField({
          id: 'draftMultiField',
          title: '',
          children: [
            buildDescriptionField({
              id: 'description',
              title: draft.descriptionFieldTitle,
              description: draft.descriptionFieldDescription,
            }),
            buildSubmitField({
              id: 'submit',
              placement: 'footer',
              title: draft.submitButtonTitle,
              refetchApplicationAfterSubmit: true,
              actions: [
                {
                  event: 'SUBMIT',
                  name: draft.submitButtonTitle,
                  type: 'primary',
                },
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
