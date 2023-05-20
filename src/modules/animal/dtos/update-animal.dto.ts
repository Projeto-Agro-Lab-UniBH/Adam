import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnimalDto {
  @ApiProperty({
    description: 'animal profile picture',
    default: '',
  })
  profile_photo?: string;

  @ApiProperty({
    type: String,
    description: 'animal name',
    default: 'Kira',
  })
  @IsNotEmpty({ message: 'name field cannot be empty' })
  @IsString({ message: 'name field must be string' })
  name?: string;

  @ApiProperty({
    type: String,
    description: 'animal owner name',
    default: 'não identificado',
  })
  @IsString({ message: 'owner field must be string' })
  owner?: string;

  @ApiProperty({
    type: String,
    description: 'animal specie name',
    default: 'Amazona aestiva',
  })
  @IsNotEmpty({ message: 'specie field cannot be empty' })
  @IsString({ message: 'specie field must be string' })
  specie?: string;

  @ApiProperty({
    type: String,
    description: 'animal race name',
    default: 'papagaio-verdadeiro',
  })
  @IsString({ message: 'race field must be string' })
  race?: string;

  @ApiProperty({
    type: String,
    description: 'animal gender name',
    default: 'Macho',
  })
  @IsNotEmpty({ message: 'gender field cannot be empty' })
  @IsString({ message: 'gender field must be string' })
  gender?: string;

  @ApiProperty({
    type: String,
    description: 'animal kind name',
    default: 'Aves',
  })
  @IsNotEmpty({ message: 'type field cannot be empty' })
  @IsString({ message: 'type field must be string' })
  type?: string;

  @ApiProperty({
    type: String,
    description: 'animal weight',
    default: '320g',
  })
  @IsString({ message: 'weight field must be string' })
  weight?: string;

  @ApiProperty({
    type: String,
    description: 'What situation is the animal in?',
    default: 'Em observação',
  })
  @IsString({ message: 'situation field must be string' })
  situation?: string;

  @ApiProperty({
    description: 'animal diagnosis',
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
    description: 'physical size of the animal',
    default: 'Leve porte',
  })
  @IsString({ message: 'physical_shape field must be string' })
  physical_shape?: string;

  @ApiProperty({
    type: String,
    description: 'date the animal was admitted to the hospital',
    default: '21-03-2013',
  })
  @IsString({ message: 'entry_date field must be string' })
  entry_date?: string;

  @ApiProperty({
    type: String,
    description: 'date the animal left the hospital',
    default: '24-03-2013',
  })
  @IsString({ message: 'departure_date field must be string' })
  departure_date?: string;
}
