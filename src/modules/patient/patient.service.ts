import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, Prisma } from '@prisma/client';
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

  async findByValues(
    prognosis = '',
    gender = '',
    physical_shape = '',
    search = '',
  ): Promise<
    Pick<Patient, 'id' | 'profile_photo' | 'name' | 'specie' | 'race'>[]
  > {
    const whereClause: Prisma.PatientWhereInput = {};

    if (prognosis) {
      whereClause.prognosis = prognosis;
    }
    if (gender) {
      whereClause.gender = gender;
    }
    if (physical_shape) {
      whereClause.physical_shape = physical_shape;
    }

    if (search) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const result = await this.prisma.patient.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        profile_photo: true,
        name: true,
        specie: true,
        race: true,
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async create(data: CreatePatientDto) {
    const newData = await this.prisma.patient.create({
      data: {
        ...data,
        owner: data.ownerless_patient ? '' : data.owner,
        specie: data.undefined_specie ? '' : data.specie,
        race: data.undefined_race ? '' : data.race,
      },
    });

    return newData;
  }

  async update(id: string, data: UpdatePatientDto) {
    const patientExists = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patientExists) {
      throw new NotFoundException('Not found patient.');
    }

    const {
      profile_photo,
      ownerless_patient,
      undefined_specie,
      undefined_race,
      ...updatedData
    } = data;

    if (profile_photo) {
      const getfile = patientExists.profile_photo?.split('/').pop();
      if (getfile) {
        await this.fileService.deleteFile(getfile, 'image');
      }
    }

    await this.prisma.patient.update({
      where: { id },
      data: {
        ...updatedData,
        owner: ownerless_patient ? '' : data.owner,
        specie: undefined_specie ? '' : data.specie,
        race: undefined_race ? '' : data.race,
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
    page = 1,
    size = 6,
    prognosis = '',
    gender = '',
    physical_shape = '',
    search = '',
  ) {
    const whereClause: Prisma.PatientWhereInput = {};

    if (prognosis) {
      whereClause.prognosis = prognosis;
    }
    if (gender) {
      whereClause.gender = gender;
    }
    if (physical_shape) {
      whereClause.physical_shape = physical_shape;
    }

    if (search) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const skip = (page - 1) * size;
    const take = Number(size);

    const [results, totalItems] = await Promise.all([
      this.prisma.patient.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: {
          id: 'desc',
        },
        include: {
          reports: {
            select: {
              id: true,
              patientId: true,
              shift: true,
              author: true,
              title: true,
              report_text: true,
              filename: true,
              fileUrl: true,
              fileSize: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          exams: {
            select: {
              id: true,
              patientId: true,
              date: true,
              author: true,
              type_of_exam: true,
              annotations: true,
              filename: true,
              fileUrl: true,
              fileSize: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          files: {
            select: {
              id: true,
              patientId: true,
              filename: true,
              fileUrl: true,
              fileSize: true,
            },
          },
        },
      }),
      this.prisma.patient.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalItems / size) - 1;

    return {
      results,
      info: {
        length: totalItems,
        size,
        lastPage: totalPages,
        page,
        startIndex: page * size,
        endIndex: page * size + (size - 1),
      },
    };
  }
}

function isValidObjectID(objectID: string): boolean {
  // Verificar se a string tem exatamente 24 caracteres (12 bytes em formato hexadecimal)
  if (objectID.length !== 24) {
    return false;
  }

  // Verificar se a string consiste apenas em caracteres hexadecimais
  const hexRegex = /^[0-9a-fA-F]+$/;
  if (!hexRegex.test(objectID)) {
    return false;
  }

  return true;
}
