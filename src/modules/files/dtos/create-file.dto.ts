import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty()
  patientId: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  fileSize: number;
}
