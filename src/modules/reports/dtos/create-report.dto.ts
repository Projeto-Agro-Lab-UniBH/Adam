import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username field cannot be empty' })
  @IsString({ message: 'username field must be string' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'title field cannot be empty' })
  @IsString({ message: 'title field must be string' })
  title: string;

  @ApiProperty()
  // @MaxLength(1000, {
  //   message: 'text must not contain more than 1000 characters',
  // })
  @IsNotEmpty({ message: 'text field cannot be empty' })
  @IsString({ message: 'text field must be string' })
  text: string;
}
