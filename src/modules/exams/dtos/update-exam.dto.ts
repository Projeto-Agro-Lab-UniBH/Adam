import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';

export class UpdateExamDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name field cannot be empty' })
  @IsString({ message: 'name field must be string' })
  name: string;

  @ApiProperty()
  @IsNotEmptyObject({}, { message: 'exam field cannot be object empty' })
  @IsObject({ message: 'exam field must be a json object' })
  data: Prisma.JsonValue;
}
