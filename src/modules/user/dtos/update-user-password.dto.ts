import { ApiProperty } from '@nestjs/swagger';
import { MinLength, Matches, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
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
