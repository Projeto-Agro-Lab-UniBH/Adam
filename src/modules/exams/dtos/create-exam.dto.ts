import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'author name field cannot be empty' })
  @IsString({ message: 'author name field must be string' })
  author: string;

  @ApiProperty()
  type_of_exam: string;

  @ApiProperty()
  annotations?: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  fileSize: number;
}
