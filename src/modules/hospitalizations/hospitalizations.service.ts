import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHospitalizationDto } from './dtos/create-hospitalization.dto';
import { UpdateHospitalizationDto } from './dtos/update-hospitalization.dto';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HospitalizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
  ) {}

  async create({
    patientId,
    username,
    reason,
    prognosis,
    entry_date,
    departure_date,
    notes,
  }: CreateHospitalizationDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new NotFoundException('Animal id not exist.');
    }

    return await this.prisma.hospitalizations.create({
      data: {
        patientId,
        username,
        reason,
        prognosis,
        entry_date,
        departure_date,
        notes,
      },
    });
  }

  async findOne(id: string) {
    const hospitalization = await this.prisma.hospitalizations.findUnique({
      where: {
        id,
      },
    });

    return hospitalization;
  }

  async update(
    id: string,
    {
      reason,
      prognosis,
      entry_date,
      departure_date,
      notes,
    }: UpdateHospitalizationDto,
  ) {
    const dataExists = await this.prisma.hospitalizations.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists)
      throw new NotFoundException('Hospitalization id not exist.');

    await this.prisma.hospitalizations.update({
      where: {
        id,
      },
      data: {
        reason,
        prognosis,
        entry_date,
        departure_date,
        notes,
      },
    });
  }

  async remove(id: string) {
    const dataExists = await this.prisma.hospitalizations.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists)
      throw new NotFoundException('Hospitalization id not exist.');

    await this.prisma.hospitalizations.delete({ where: { id } });
  }
}
