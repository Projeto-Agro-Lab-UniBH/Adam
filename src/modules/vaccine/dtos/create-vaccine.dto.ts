import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVaccineDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username field cannot be empty' })
  @IsString({ message: 'username field must be string' })
  username: string;

  @ApiProperty()
  vaccine: string;

  @ApiProperty()
  date_of_vaccination: string;

  @ApiProperty()
  revaccination_date?: string;

  @ApiProperty()
  vaccine_code?: string;

  @ApiProperty()
  name_of_veterinarian: string;

  @ApiProperty()
  age: string;
}
