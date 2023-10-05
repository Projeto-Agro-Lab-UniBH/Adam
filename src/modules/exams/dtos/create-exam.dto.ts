import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  execution_date: string;

  @ApiProperty()
  runtime: string;

  @ApiProperty()
  execution_period: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'responsible_person field cannot be empty' })
  @IsString({ message: 'responsible_person name field must be string' })
  responsible_person: string;

  @ApiProperty()
  type_of_exam: string;

  @ApiProperty()
  exam_name: string;

  @ApiProperty()
  diagnosis: Prisma.JsonArray;

  @ApiProperty()
  prognosis: string;

  @ApiProperty()
  description_of_treatment?: string;
}
