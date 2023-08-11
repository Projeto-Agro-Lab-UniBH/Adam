import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'shift field cannot be empty' })
  @IsString({ message: 'shift field must be string' })
  shift: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'author field cannot be empty' })
  @IsString({ message: 'author field must be string' })
  author: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'title field cannot be empty' })
  @IsString({ message: 'title field must be string' })
  title: string;

  @ApiProperty()
  @MaxLength(1000, {
    message: 'text must not contain more than 1000 characters',
  })
  @IsNotEmpty({ message: 'report_text field cannot be empty' })
  @IsString({ message: 'report_text field must be string' })
  report_text?: string;

  @ApiProperty()
  filename?: string;

  @ApiProperty()
  attachment?: string;
}
