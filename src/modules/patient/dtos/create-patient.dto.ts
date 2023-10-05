import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'patient profile picture',
    default: '',
  })
  profile_photo?: string;

  @ApiProperty()
  age?: string;

  @ApiProperty()
  date_of_birth?: string;

  @ApiProperty()
  pedigree_RGA?: string;

  @ApiProperty()
  chip_number?: string;

  @ApiProperty({
    type: String,
    description: 'patient name',
    default: 'Kira',
  })
  @IsString({ message: 'name field must be string' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'patient owner name',
    default: 'não identificado',
  })
  @IsString({ message: 'owner field must be string' })
  owner?: string;

  @ApiProperty()
  ownerless_patient?: boolean;

  @ApiProperty({
    type: String,
    description: 'patient specie name',
    default: 'Amazona aestiva',
  })
  @IsString({ message: 'specie field must be string' })
  specie?: string;

  @ApiProperty()
  undefined_specie?: boolean;

  @ApiProperty({
    type: String,
    description: 'patient race name',
    default: 'papagaio-verdadeiro',
  })
  @IsString({ message: 'race field must be string' })
  race?: string;

  @ApiProperty()
  undefined_race?: boolean;

  @ApiProperty()
  status: string;

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
    description: 'physical size of the patient',
    default: 'Leve porte',
  })
  @IsString({ message: 'physical_shape filed must be string' })
  physical_shape?: string;

  @ApiProperty()
  starting_weight?: string;

  @ApiProperty({
    type: String,
    description: 'patient weight',
    default: '320g',
  })
  @IsString({ message: 'weight field must be string' })
  current_weight?: string;

  @ApiProperty()
  notes?: string;
}
