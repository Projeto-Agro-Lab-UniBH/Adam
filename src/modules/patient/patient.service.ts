import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(page: number, size: number) {
    const results = await this.prisma.patient.findMany({
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async findOne(id: string) {
    const result = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException('Not found animal.');
    }

    return result;
  }

  async filterByPrognosis(page?: number, size?: number, prognosis?: string) {
    const results = await this.prisma.patient.findMany({
      where: {
        prognosis: prognosis,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByPrognosisAndGender(
    page?: number,
    size?: number,
    prognosis?: string,
    gender?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        prognosis: prognosis,
        gender: gender,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByPrognosisAndPhysicalShape(
    page?: number,
    size?: number,
    prognosis?: string,
    physical_shape?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        prognosis: prognosis,
        physical_shape: physical_shape,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByGender(page?: number, size?: number, gender?: string) {
    const results = await this.prisma.patient.findMany({
      where: {
        gender: gender,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByGenderAndPrognosis(
    page?: number,
    size?: number,
    gender?: string,
    prognosis?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        gender: gender,
        prognosis: prognosis,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByGenderAndPhysicalShape(
    page?: number,
    size?: number,
    gender?: string,
    physical_shape?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        gender: gender,
        physical_shape: physical_shape,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByPhysicalShape(
    page?: number,
    size?: number,
    physical_shape?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        physical_shape: physical_shape,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByPhysicalShapeAndPrognosis(
    page?: number,
    size?: number,
    physical_shape?: string,
    prognosis?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        physical_shape: physical_shape,
        prognosis: prognosis,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByPhysicalShapeAndGender(
    page?: number,
    size?: number,
    physical_shape?: string,
    gender?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        gender: gender,
        physical_shape: physical_shape,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async filterByMultipleFields(
    page?: number,
    size?: number,
    prognosis?: string,
    gender?: string,
    physical_shape?: string,
  ) {
    const results = await this.prisma.patient.findMany({
      where: {
        prognosis: prognosis,
        gender: gender,
        physical_shape: physical_shape,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.patient.count();

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async create(data: CreatePatientDto) {
    const newdata = await this.prisma.patient.create({
      data: {
        profile_photo: data.profile_photo,
        name: data.name,
        owner: data.owner,
        specie: data.specie,
        race: data.race,
        gender: data.gender,
        weight: data.weight,
        prognosis: data.prognosis,
        diagnosis: data.diagnosis,
        physical_shape: data.physical_shape,
        entry_date: data.entry_date,
        departure_date: data.departure_date,
      },
    });

    return newdata;
  }

  async update(id: string, data: UpdatePatientDto) {
    const patientExists = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patientExists) {
      throw new NotFoundException('Not found patient.');
    }

    const result = await this.prisma.patient.update({
      where: {
        id,
      },
      data: {
        profile_photo: data.profile_photo,
        name: data.name,
        owner: data.owner,
        specie: data.specie,
        race: data.race,
        gender: data.gender,
        weight: data.weight,
        prognosis: data.prognosis,
        diagnosis: data.diagnosis,
        physical_shape: data.physical_shape,
        entry_date: data.entry_date,
        departure_date: data.departure_date,
      },
    });

    return result;
  }

  async delete(id: string) {
    const patientExists = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patientExists) {
      throw new NotFoundException('Not found patient.');
    }

    return await this.prisma.patient.delete({ where: { id } });
  }
}
