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
  @Get('filter-by-prognosis?')
  async filterByPrognosis(
    @Query('prognosis') prognosis: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByPrognosis(
      Number(defaultPage),
      Number(defaultSize),
      prognosis,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-prognosis-and-gender?')
  async filterByPrognosisAndGender(
    @Query('prognosis') prognosis: string,
    @Query('gender') gender: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByPrognosisAndGender(
      Number(defaultPage),
      Number(defaultSize),
      prognosis,
      gender,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-prognosis-and-physical?')
  async filterByPrognosisAndPhysicalShape(
    @Query('prognosis') prognosis: string,
    @Query('physical_shape') physical_shape: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByPrognosisAndPhysicalShape(
      Number(defaultPage),
      Number(defaultSize),
      prognosis,
      physical_shape,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-gender?')
  async filterByGender(
    @Query('gender') gender: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByGender(
      Number(defaultPage),
      Number(defaultSize),
      gender,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-gender-and-prognosis?')
  async filterByGenderAndPrognosis(
    @Query('gender') gender: string,
    @Query('prognosis') prognosis: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByGenderAndPrognosis(
      Number(defaultPage),
      Number(defaultSize),
      gender,
      prognosis,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-gender-and-physical?')
  async filterByGenderAndPhysicalShape(
    @Query('gender') gender: string,
    @Query('physical_shape') physical_shape: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByGenderAndPhysicalShape(
      Number(defaultPage),
      Number(defaultSize),
      gender,
      physical_shape,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-physical?')
  async filterByPhysicalShape(
    @Query('physical_shape') physical_shape: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByPhysicalShape(
      Number(defaultPage),
      Number(defaultSize),
      physical_shape,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-physical-and-gender?')
  async filterByPhysicalShapeAndGender(
    @Query('physical_shape') physical_shape: string,
    @Query('gender') gender: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByPhysicalShapeAndGender(
      Number(defaultPage),
      Number(defaultSize),
      physical_shape,
      gender,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-physical-and-prognosis?')
  async filterByPhysicalShapeAndPrognosis(
    @Query('physical_shape') physical_shape: string,
    @Query('prognosis') prognosis: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByPhysicalShapeAndPrognosis(
      Number(defaultPage),
      Number(defaultSize),
      physical_shape,
      prognosis,
    );

    return result;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('filter-by-multiple-fields?')
  async filterByMultipleFields(
    @Query('prognosis') prognosis: string,
    @Query('gender') gender: string,
    @Query('physical_shape') physical_shape: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
  ) {
    const defaultPage = !page ? 1 : page;
    const defaultSize = !size ? 6 : size;

    const result = await this.patientService.filterByMultipleFields(
      Number(defaultPage),
      Number(defaultSize),
      prognosis,
      gender,
      physical_shape,
    );

    return result;
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

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientService.delete(id);
  }
}
