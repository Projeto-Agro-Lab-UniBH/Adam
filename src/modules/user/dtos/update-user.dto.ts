import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'user name',
    default: 'Theo Montesquieu Hernandes',
  })
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username field must be string' })
  username?: string;

  @ApiProperty({
    type: String,
    description: 'user email',
    default: 'theo10montesquieu@outlook.com',
  })
  @IsString({ message: 'email field must be string' })
  @IsEmail({}, { message: 'email shoud be valid' })
  email?: string;

  @ApiProperty({
    type: String,
    description: 'password of account',
    default: '95jhti0-ydtKh9gcn87ybewd#&',
  })
  @MinLength(6, { message: 'password must contain at least 8 characters' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message: 'The password does not meet the requirements',
  })
  @IsString({ message: 'password field must be string' })
  password?: string;
}
