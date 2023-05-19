import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnimalDto {
  @ApiProperty()
  profile_photo?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'name field cannot be empty' })
  @IsString({ message: 'name field must be string' })
  name?: string;

  @ApiProperty()
  @IsString({ message: 'owner field must be string' })
  owner?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'specie field cannot be empty' })
  @IsString({ message: 'specie field must be string' })
  specie?: string;

  @ApiProperty()
  @IsString({ message: 'race field must be string' })
  race?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'gender field cannot be empty' })
  @IsString({ message: 'gender field must be string' })
  gender?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'type field cannot be empty' })
  @IsString({ message: 'type field must be string' })
  type?: string;

  @ApiProperty()
  @IsString({ message: 'weight filed must be string' })
  weight?: string;

  @ApiProperty()
  @IsString({ message: 'situation filed must be string' })
  situation?: string;

  @ApiProperty()
  diagnosis?: Prisma.JsonValue[];

  @ApiProperty()
  @IsString({ message: 'physical_shape filed must be string' })
  physical_shape?: string;

  @ApiProperty()
  @IsString({ message: 'entry_date filed must be string' })
  entry_date?: string;

  @ApiProperty()
  @IsString({ message: 'departure_date filed must be string' })
  departure_date?: string;
}
