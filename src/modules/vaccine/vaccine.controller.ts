import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dtos/create-vaccine.dto';
import { UpdateVaccineDto } from './dtos/update-vaccine.dto';

@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineService.update(id, updateVaccineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(id);
  }
}
