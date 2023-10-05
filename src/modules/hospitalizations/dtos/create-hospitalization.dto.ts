import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalizationDto {
  @ApiProperty()
  patientId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  prognosis: string;

  @ApiProperty()
  entry_date: string;

  @ApiProperty()
  departure_date?: string;

  @ApiProperty()
  notes: string;
}
