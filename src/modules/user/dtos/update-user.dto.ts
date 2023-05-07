import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  profile_photo?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username field must be string' })
  username: string;

  @ApiProperty()
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
