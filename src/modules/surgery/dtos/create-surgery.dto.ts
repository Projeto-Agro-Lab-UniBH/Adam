import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSurgeryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'patientId field cannot be empty' })
  @IsString({ message: 'patientId field must be string' })
  patientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'username field cannot be empty' })
  @IsString({ message: 'username field must be string' })
  username: string;

  @ApiProperty()
  name_of_surgery: string;

  @ApiProperty()
  risk_level: string;

  @ApiProperty()
  execution_date: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  period: string;

  @ApiProperty()
  notes: string;
}
