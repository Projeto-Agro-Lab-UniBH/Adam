import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HospitalizationsService } from './hospitalizations.service';
import { CreateHospitalizationDto } from './dtos/create-hospitalization.dto';
import { UpdateHospitalizationDto } from './dtos/update-hospitalization.dto';

@Controller('hospitalizations')
export class HospitalizationsController {
  constructor(
    private readonly hospitalizationsService: HospitalizationsService,
  ) {}

  @Post()
  create(@Body() createHospitalizationDto: CreateHospitalizationDto) {
    return this.hospitalizationsService.create(createHospitalizationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalizationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitalizationDto: UpdateHospitalizationDto,
  ) {
    return this.hospitalizationsService.update(id, updateHospitalizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalizationsService.remove(id);
  }
}
