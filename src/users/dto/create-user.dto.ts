import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example123',
    description:
      'Username of an user. It must be alphanumeric (a - z or A - Z or 1 - 9). It is case sensetive (example and Example are not same).',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username must be alphanumeric' })
  readonly username: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'Email of an user. Must be a valid email.',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'pA$$w0rd',
    description:
      'Must be a strong password with length of 6 characters, containing a mix of uppercase and lowercase letters (A-Z, a-z), numbers (0 - 9), and special characters (!, $, @ etc).',
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}
