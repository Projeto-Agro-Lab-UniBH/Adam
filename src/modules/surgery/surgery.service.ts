import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurgeryDto } from './dtos/create-surgery.dto';
import { UpdateSurgeryDto } from './dtos/update-surgery.dto';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SurgeryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
  ) {}

  async create({
    patientId,
    username,
    name_of_surgery,
    risk_level,
    execution_date,
    duration,
    period,
    notes,
  }: CreateSurgeryDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new NotFoundException('Animal id not exist.');
    }

    return await this.prisma.surgery.create({
      data: {
        patientId,
        username,
        name_of_surgery,
        risk_level,
        execution_date,
        duration,
        period,
        notes,
      },
    });
  }

  async findOne(id: string) {
    const dataExists = await this.prisma.surgery.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) throw new NotFoundException('Surgery id not exist.');

    return dataExists;
  }

  async update(
    id: string,
    {
      name_of_surgery,
      risk_level,
      execution_date,
      duration,
      period,
      notes,
    }: UpdateSurgeryDto,
  ) {
    const dataExists = await this.prisma.surgery.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) throw new NotFoundException('Surgery id not exist.');

    return await this.prisma.surgery.update({
      where: {
        id,
      },
      data: {
        name_of_surgery,
        risk_level,
        execution_date,
        duration,
        period,
        notes,
      },
    });
  }

  async remove(id: string) {
    const dataExists = await this.prisma.surgery.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) throw new NotFoundException('Surgery id not exist.');

    await this.prisma.surgery.delete({ where: { id } });
  }
}
