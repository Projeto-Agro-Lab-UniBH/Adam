import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorator/is-public.decorator';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateReportDto) {
    return await this.reportsService.create(body);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @IsPublic()
  @Get(':patientId/reports')
  getAllReportsByPatientId(@Param('patientId') patientId: string) {
    return this.reportsService.getAllReportsByPatientId(patientId);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
