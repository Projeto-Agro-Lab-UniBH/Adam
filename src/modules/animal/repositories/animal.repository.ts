import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AnimalEntity } from '../entities/animal.entity';
import { CreateAnimalDto } from '../dtos/create-animal.dto';
import { UpdateAnimalDto } from '../dtos/update-animal.dto';

@Injectable()
export class AnimalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AnimalEntity | null> {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      // include: {
      //   reports: {
      //     select: {
      //       id: true,
      //       patientId: false,
      //       title: true,
      //       text: true,
      //       createdAt: true,
      //       updatedAt: true,
      //       patient: false,
      //     },
      //   },
      //   exams: {
      //     select: {
      //       id: true,
      //       patientId: false,
      //       name: true,
      //       data: true,
      //       createdAt: true,
      //       updatedAt: true,
      //       patient: false,
      //     },
      //   },
      // },
    });

    if (!animal) {
      return null;
    }

    return animal;
  }

  async filterByAnimalType(type: string): Promise<AnimalEntity[] | null> {
    const animals = await this.prisma.animal.findMany({
      where: {
        type: {
          contains: type,
        },
      },
    });

    if (!animals) {
      return null;
    }

    return animals;
  }

  async getAll(): Promise<AnimalEntity[] | null> {
    const animals = await this.prisma.animal.findMany();
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
    type,
    weight,
    situation,
    physical_shape,
    entry_date,
    departure_date,
  }: CreateAnimalDto): Promise<AnimalEntity> {
    return await this.prisma.animal.create({
      data: {
        profile_photo,
        name,
        owner,
        specie,
        race,
        gender,
        type,
        weight,
        situation,
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
      type,
      weight,
      situation,
      physical_shape,
      entry_date,
      departure_date,
    }: UpdateAnimalDto,
  ): Promise<AnimalEntity> {
    return await this.prisma.animal.update({
      where: { id },
      data: {
        profile_photo,
        name,
        owner,
        specie,
        race,
        gender,
        type,
        weight,
        situation,
        physical_shape,
        entry_date,
        departure_date,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.animal.delete({ where: { id } });
  }
}
