import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateExamDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'name field cannot be empty' })
  @IsString({ message: 'name field must be string' })
  name: string;

  @ApiProperty()
  @IsNotEmptyObject({}, { message: 'data field cannot be object empty' })
  @IsObject({ message: 'data field must be a json object' })
  data: Prisma.JsonValue;
}
