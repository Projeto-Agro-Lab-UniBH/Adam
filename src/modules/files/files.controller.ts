import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dtos/create-file.dto';
import { IsPublic } from '../auth/decorator/is-public.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @IsPublic()
  @Get(':patientId/files')
  async findAll(@Param('patientId') patientId: string) {
    return await this.filesService.getAllFilesByPatientId(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
