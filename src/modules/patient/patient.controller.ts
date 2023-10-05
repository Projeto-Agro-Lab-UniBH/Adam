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
  Request,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorator/is-public.decorator';

@ApiTags('Patient')
@Controller('patient')
@IsPublic()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query('page') page = 1, @Query('size') size = 6) {
    return this.patientService.getAll(page, size);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('search/by/name')
  async findByName(@Request() request) {
    const { search = '' } = request.query;

    return this.patientService.findByName(search);
  }

  @HttpCode(HttpStatus.OK)
  @Get('search/by/filters')
  async search(@Request() request) {
    const {
      page = 1,
      size = 6,
      status = '',
      gender = '',
      physical_shape = '',
    } = request.query;
    return this.patientService.filter(
      page,
      size,
      status,
      gender,
      physical_shape,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(id, updatePatientDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}
