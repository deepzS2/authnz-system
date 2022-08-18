import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  name?: string;

  @IsNumber()
  permissions?: number;
}
