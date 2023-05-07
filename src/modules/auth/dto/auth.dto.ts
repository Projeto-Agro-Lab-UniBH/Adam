import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'email field cannot be empty' })
  @IsString({ message: 'email field must be string' })
  @IsEmail({}, { message: 'email shoud be valid' })
  email: string;

  @IsNotEmpty({ message: 'password field cannot be empty' })
  @IsString({ message: 'password field must be string' })
  password: string;
}
