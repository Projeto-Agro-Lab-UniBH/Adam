import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { AzureFileService } from '../azure/azure.file.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: AzureFileService,
    private readonly patientService: PatientService,
  ) {}

  async create({ patientId, username, title, text }: CreateReportDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new NotFoundException('Animal id not exist.');
    }

    return await this.prisma.reports.create({
      data: {
        patientId,
        username,
        title,
        text,
      },
    });
  }

  async findOne(id: string) {
    const report = await this.prisma.reports.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return report;
  }

  async getAllReportsByPatientId(patientId: string) {
    const result = await this.prisma.reports.findMany({
      where: {
        patientId: {
          equals: patientId,
        },
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async update(
    id: string,
    { patientId, username, title, text }: UpdateReportDto,
  ) {
    const report = await this.prisma.reports.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    await this.prisma.reports.update({
      where: { id },
      data: {
        patientId,
        username,
        title,
        text,
      },
    });
  }

  async remove(id: string) {
    const report = await this.prisma.reports.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    await this.prisma.reports.delete({
      where: {
        id,
      },
    });
  }
}
