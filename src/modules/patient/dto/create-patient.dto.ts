import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'patient profile picture',
    default: '',
  })
  profile_photo?: string;

  @ApiProperty({
    type: String,
    description: 'patient name',
    default: 'Kira',
  })
  @IsNotEmpty({ message: 'name field cannot be empty' })
  @IsString({ message: 'name field must be string' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'patient owner name',
    default: 'não identificado',
  })
  @IsString({ message: 'owner field must be string' })
  owner?: string;

  @ApiProperty({
    type: String,
    description: 'patient specie name',
    default: 'Amazona aestiva',
  })
  @IsString({ message: 'specie field must be string' })
  specie?: string;

  @ApiProperty({
    type: String,
    description: 'patient race name',
    default: 'papagaio-verdadeiro',
  })
  @IsString({ message: 'race field must be string' })
  race?: string;

  @ApiProperty({
    type: String,
    description: 'patient gender name',
    default: 'Macho',
  })
  @IsNotEmpty({ message: 'gender field cannot be empty' })
  @IsString({ message: 'gender field must be string' })
  gender: string;

  @ApiProperty({
    type: String,
    description: 'patient weight',
    default: '320g',
  })
  @IsString({ message: 'weight field must be string' })
  weight?: string;

  @ApiProperty({
    type: String,
    description: 'What situation is the patient in?',
    default: 'Aguardando alta',
  })
  @IsString({ message: 'situation field must be string' })
  prognosis?: string;

  @ApiProperty({
    description: 'patient diagnosis',
    default: [
      {
        label: 'Asas quebradas',
        value: 'Asas quebradas',
      },
      {
        label: 'Bico perfurado',
        value: 'Bico perfurado',
      },
    ],
  })
  diagnosis?: Prisma.JsonValue[];

  @ApiProperty({
    type: String,
    description: 'physical size of the patient',
    default: 'Leve porte',
  })
  @IsString({ message: 'physical_shape filed must be string' })
  physical_shape?: string;

  @ApiProperty({
    type: String,
    description: 'date the patient was admitted to the hospital',
    default: '21-03-2013',
  })
  @IsString({ message: 'entry_date field must be string' })
  entry_date?: string;

  @ApiProperty({
    type: String,
    description: 'date the patient left the hospital',
    default: '24-03-2013',
  })
  @IsString({ message: 'departure_date field must be string' })
  departure_date?: string;
}
