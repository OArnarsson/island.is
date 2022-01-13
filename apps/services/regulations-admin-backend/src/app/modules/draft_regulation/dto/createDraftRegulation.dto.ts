import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateDraftRegulationDto {
  @IsUUID()
  @ApiProperty()
  readonly id!: string

  @IsString()
  @ApiProperty()
  readonly drafting_status!: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name?: string

  @IsString()
  @ApiProperty()
  readonly title!: string

  @IsString()
  @ApiProperty()
  readonly text!: string

  @IsString()
  @ApiProperty()
  readonly drafting_notes!: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly ideal_publish_date?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly ministry_id?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly signature_date?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly effective_date?: string

  @IsOptional()
  @IsArray()
  @ApiProperty()
  authors?: string[]

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly type?: string
}
