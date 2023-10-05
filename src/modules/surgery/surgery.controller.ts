import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SurgeryService } from './surgery.service';
import { CreateSurgeryDto } from './dtos/create-surgery.dto';
import { UpdateSurgeryDto } from './dtos/update-surgery.dto';

@Controller('surgery')
export class SurgeryController {
  constructor(private readonly surgeryService: SurgeryService) {}

  @Post()
  create(@Body() createSurgeryDto: CreateSurgeryDto) {
    return this.surgeryService.create(createSurgeryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surgeryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurgeryDto: UpdateSurgeryDto) {
    return this.surgeryService.update(id, updateSurgeryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surgeryService.remove(id);
  }
}
