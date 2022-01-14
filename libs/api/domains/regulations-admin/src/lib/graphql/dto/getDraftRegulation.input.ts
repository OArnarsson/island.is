import { RegulationDraftId } from '@island.is/regulations/admin'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetDraftRegulationInput {
  @Field(() => String)
  draftId!: RegulationDraftId
}
