import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateReportDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'title field cannot be empty' })
  @IsString({ message: 'title field must be string' })
  title: string;

  @ApiProperty()
  @MaxLength(1000, {
    message: 'text must not contain more than 1000 characters',
  })
  @IsNotEmpty({ message: 'text field cannot be empty' })
  @IsString({ message: 'text field must be string' })
  text: string;
}
