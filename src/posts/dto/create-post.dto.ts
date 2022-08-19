import { IsNotEmpty, IsString, IsBoolean } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  content?: string

  @IsBoolean()
  published = false
}
