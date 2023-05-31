import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PatientEntity } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Injectable()
export class PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PatientEntity | null> {
    const animal = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!animal) {
      return null;
    }

    return animal;
  }

  async getAll(): Promise<PatientEntity[] | null> {
    const animals = await this.prisma.patient.findMany();
    if (!animals) {
      return null;
    }
    return animals;
  }

  async create({
    profile_photo,
    name,
    owner,
    specie,
    race,
    gender,
    weight,
    prognosis,
    diagnosis,
    physical_shape,
    entry_date,
    departure_date,
  }: CreatePatientDto): Promise<PatientEntity> {
    return await this.prisma.patient.create({
      data: {
        profile_photo,
        name,
        owner,
        specie,
        race,
        gender,
        weight,
        prognosis,
        diagnosis,
        physical_shape,
        entry_date,
        departure_date,
      },
    });
  }

  async update(
    id: string,
    {
      profile_photo,
      name,
      owner,
      specie,
      race,
      gender,
      weight,
      prognosis,
      diagnosis,
      physical_shape,
      entry_date,
      departure_date,
    }: UpdatePatientDto,
  ): Promise<PatientEntity> {
    return await this.prisma.patient.update({
      where: { id },
      data: {
        profile_photo,
        name,
        owner,
        specie,
        race,
        gender,
        weight,
        prognosis,
        diagnosis,
        physical_shape,
        entry_date,
        departure_date,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.patient.delete({ where: { id } });
  }
}
