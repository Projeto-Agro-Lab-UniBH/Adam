import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './repositories/patient.repository';

@Injectable()
export class PatientService {
  constructor(private readonly repository: PatientRepository) {}

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
  }: CreatePatientDto) {
    return await this.repository.create({
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
    });
  }

  async findAll() {
    return await this.repository.getAll();
  }

  async findOne(id: string) {
    const animal = await this.repository.findById(id);

    if (!animal) {
      throw new NotFoundException('Not found animal.');
    }

    return animal;
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
  ) {
    const animal = await this.repository.findById(id);

    if (!animal) {
      throw new NotFoundException('Not found animal.');
    }

    return await this.repository.update(id, {
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
    });
  }

  async remove(id: string) {
    const animal = await this.repository.findById(id);

    if (!animal) {
      throw new NotFoundException('Not found animal.');
    }

    return await this.repository.delete(id);
  }
}
