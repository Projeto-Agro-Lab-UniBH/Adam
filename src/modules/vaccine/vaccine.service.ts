import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineDto } from './dtos/create-vaccine.dto';
import { UpdateVaccineDto } from './dtos/update-vaccine.dto';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VaccineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
  ) {}

  async create({
    patientId,
    username,
    vaccine,
    date_of_vaccination,
    revaccination_date,
    name_of_veterinarian,
    vaccine_code,
    age,
  }: CreateVaccineDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new NotFoundException('Animal id not exist.');
    }

    return await this.prisma.vaccine.create({
      data: {
        patientId,
        username,
        vaccine,
        date_of_vaccination,
        revaccination_date,
        name_of_veterinarian,
        vaccine_code,
        age,
      },
    });
  }

  async findOne(id: string) {
    const dataExists = await this.prisma.vaccine.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) throw new NotFoundException('Vaccine id not exist.');

    return dataExists;
  }

  async update(
    id: string,
    {
      vaccine,
      date_of_vaccination,
      revaccination_date,
      name_of_veterinarian,
      vaccine_code,
      age,
    }: UpdateVaccineDto,
  ) {
    const dataExists = await this.prisma.vaccine.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) throw new NotFoundException('Vaccine id not exist.');

    return await this.prisma.vaccine.update({
      where: {
        id,
      },
      data: {
        vaccine,
        date_of_vaccination,
        revaccination_date,
        name_of_veterinarian,
        vaccine_code,
        age,
      },
    });
  }

  async remove(id: string) {
    const dataExists = await this.prisma.vaccine.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) throw new NotFoundException('Vaccine id not exist.');

    await this.prisma.vaccine.delete({ where: { id } });
  }
}
