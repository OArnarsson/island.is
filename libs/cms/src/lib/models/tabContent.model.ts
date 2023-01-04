import { Field, ObjectType } from '@nestjs/graphql'
import { ITabContent } from '../generated/contentfulTypes'
import { Image, mapImage } from './image.model'
import { mapDocument, SliceUnion } from '../unions/slice.union'

@ObjectType()
export class TabContent {
  @Field()
  tabTitle!: string

  @Field({ nullable: true })
  contentTitle?: string

  @Field(() => Image, { nullable: true })
  image?: Image | null

  @Field(() => [SliceUnion], { nullable: true })
  body?: Array<typeof SliceUnion>
}

export const mapTabContent = ({ sys, fields }: ITabContent): TabContent => ({
  tabTitle: fields.tabTitle ?? '',
  contentTitle: fields.contentTitle ?? '',
  image: fields.image ? mapImage(fields.image) : null,
  body: fields.body ? mapDocument(fields.body, sys.id + ':body') : [],
})
