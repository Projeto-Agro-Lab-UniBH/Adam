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
      include: {
        exams: {
          select: {
            id: true,
            patientId: true,
            username: true,
            execution_date: true,
            runtime: true,
            execution_period: true,
            responsible_person: true,
            type_of_exam: true,
            exam_name: true,
            diagnosis: true,
            prognosis: true,
            description_of_treatment: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        vaccines: {
          select: {
            id: true,
            patientId: true,
            username: true,
            vaccine: true,
            date_of_vaccination: true,
            revaccination_date: true,
            name_of_veterinarian: true,
            vaccine_code: true,
            age: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        surgery: {
          select: {
            id: true,
            patientId: true,
            username: true,
            name_of_surgery: true,
            risk_level: true,
            execution_date: true,
            duration: true,
            period: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        hospitalizations: {
          select: {
            id: true,
            patientId: true,
            username: true,
            reason: true,
            prognosis: true,
            entry_date: true,
            departure_date: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        reports: {
          select: {
            id: true,
            patientId: true,
            username: true,
            title: true,
            text: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Not found animal.');
    }

    return result;
  }

  async findByName(
    search = '',
  ): Promise<
    Pick<Patient, 'id' | 'profile_photo' | 'name' | 'specie' | 'race'>[]
  > {
    const whereClause: Prisma.PatientWhereInput = {};

    if (search && !isValidObjectID(search)) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive',
      };
    } else if (search) {
      whereClause.id = search;
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
      ownerless_patient,
      undefined_specie,
      undefined_race,
      ...updatedData
    } = data;

    if (data.profile_photo != null) {
      const file_image = patientExists?.profile_photo;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'image');
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

  async filter(
    page = 1,
    size = 12,
    status = '',
    gender = '',
    physical_shape = '',
  ) {
    const whereClause: Prisma.PatientWhereInput = {};

    if (status) {
      whereClause.status = status;
    }
    if (gender) {
      whereClause.gender = gender;
    }
    if (physical_shape) {
      whereClause.physical_shape = physical_shape;
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
          _count: {
            select: {
              vaccines: true,
              exams: true,
              surgery: true,
              hospitalizations: true,
              reports: true,
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
