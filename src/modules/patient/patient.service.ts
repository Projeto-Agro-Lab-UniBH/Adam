import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Patient } from '@prisma/client';
import { AzureFileService } from '../azure/azure.file.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: AzureFileService,
  ) {}

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

  async findOne(id: string): Promise<Patient> {
    const result = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException('Not found animal.');
    }

    return result;
  }

  async create(data: CreatePatientDto) {
    const newdata = await this.prisma.patient.create({
      data: {
        profile_photo: data.profile_photo,
        name: data.name,
        nameless_patient: data.nameless_patient,
        owner: data.owner,
        ownerless_patient: data.ownerless_patient,
        specie: data.specie,
        undefined_specie: data.undefined_specie,
        race: data.race,
        undefined_race: data.undefined_race,
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

    if (data.profile_photo != null) {
      const file_image = patientExists?.profile_photo;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'image');
    }

    await this.prisma.patient.update({
      where: {
        id,
      },
      data: {
        profile_photo: data.profile_photo,
        name: data.name,
        nameless_patient: data.nameless_patient,
        owner: data.owner,
        ownerless_patient: data.ownerless_patient,
        specie: data.specie,
        undefined_specie: data.undefined_specie,
        race: data.race,
        undefined_race: data.undefined_race,
        gender: data.gender,
        weight: data.weight,
        prognosis: data.prognosis,
        diagnosis: data.diagnosis,
        physical_shape: data.physical_shape,
        entry_date: data.entry_date,
        departure_date: data.departure_date,
      },
    });
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

  async search(
    page?: number,
    size?: number,
    prognosis?: string,
    gender?: string,
    physical_shape?: string,
  ) {
    let results: Patient[];
    let totalItems: number;

    results = await this.prisma.patient.findMany({
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: {
        id: 'desc',
      },
    });

    totalItems = await this.prisma.patient.count();

    if (prognosis != '') {
      results = await this.prisma.patient.findMany({
        where: { prognosis: prognosis },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { prognosis: prognosis },
      });
    }

    if (prognosis != '' && gender != '') {
      results = await this.prisma.patient.findMany({
        where: { prognosis: prognosis, gender: gender },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { prognosis: prognosis, gender: gender },
      });
    }
    if (prognosis != '' && physical_shape != '') {
      results = await this.prisma.patient.findMany({
        where: { prognosis: prognosis, physical_shape: physical_shape },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { prognosis: prognosis, physical_shape: physical_shape },
      });
    }

    if (gender != '') {
      results = await this.prisma.patient.findMany({
        where: { gender: gender },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { gender: gender },
      });
    }

    if (gender != '' && prognosis != '') {
      results = await this.prisma.patient.findMany({
        where: { gender: gender, prognosis: prognosis },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { gender: gender, prognosis: prognosis },
      });
    }

    if (gender != '' && physical_shape != '') {
      results = await this.prisma.patient.findMany({
        where: { gender: gender, physical_shape: physical_shape },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { gender: gender, physical_shape: physical_shape },
      });
    }

    if (physical_shape != '') {
      results = await this.prisma.patient.findMany({
        where: { physical_shape: physical_shape },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { physical_shape: physical_shape },
      });
    }

    if (physical_shape != '' && prognosis != '') {
      results = await this.prisma.patient.findMany({
        where: { physical_shape: physical_shape, prognosis: prognosis },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { physical_shape: physical_shape, prognosis: prognosis },
      });
    }

    if (physical_shape != '' && gender != '') {
      results = await this.prisma.patient.findMany({
        where: { physical_shape: physical_shape, gender: gender },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: { physical_shape: physical_shape, gender: gender },
      });
    }

    if (prognosis != '' && gender != '' && physical_shape != '') {
      results = await this.prisma.patient.findMany({
        where: {
          prognosis: prognosis,
          physical_shape: physical_shape,
          gender: gender,
        },
        skip: (page - 1) * size,
        take: Number(size),
        orderBy: {
          id: 'desc',
        },
      });
      totalItems = await this.prisma.patient.count({
        where: {
          prognosis: prognosis,
          gender: gender,
          physical_shape: physical_shape,
        },
      });
    }

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
}
