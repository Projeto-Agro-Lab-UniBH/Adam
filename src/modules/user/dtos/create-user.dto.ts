import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  profile_photo?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username field must be string' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'email field cannot be empty' })
  @IsString({ message: 'email field must be string' })
  @IsEmail({}, { message: 'email shoud be valid' })
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'password must contain at least 8 characters' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message: 'The password does not meet the requirements',
  })
  @IsString({ message: 'password field must be string' })
  password: string;
}
