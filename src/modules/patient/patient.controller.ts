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
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query('page') page?: string, @Query('size') size?: string) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    return await this.patientService.getAll(
      Number(defaultPage),
      Number(defaultSize),
    );
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(id);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('search/filters?')
  async search(@Request() request) {
    return await this.patientService.search(
      request.query.hasOwnProperty('page') ? request.query.page : 1,
      request.query.hasOwnProperty('size') ? request.query.size : 6,
      request.query.hasOwnProperty('prognosis') ? request.query.prognosis : '',
      request.query.hasOwnProperty('gender') ? request.query.gender : '',
      request.query.hasOwnProperty('physical_shape')
        ? request.query.physical_shape
        : '',
    );
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.create(createPatientDto);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return await this.patientService.update(id, updatePatientDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientService.delete(id);
  }
}
