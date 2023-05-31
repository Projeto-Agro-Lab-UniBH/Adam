import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorator/is-public.decorator';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
