import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
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

  async create({
    patientId,
    shift,
    author,
    title,
    report_text,
    filename,
    attachment,
  }: CreateReportDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new NotFoundException('Animal id not exist.');
    }

    return await this.prisma.report.create({
      data: {
        patientId,
        shift,
        author,
        title,
        report_text,
        filename,
        attachment,
        createdAt: format(new Date(), 'dd-MM-yyyy').toString(),
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({
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
    const result = await this.prisma.report.findMany({
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
    {
      patientId,
      shift,
      author,
      title,
      report_text,
      filename,
      attachment,
    }: UpdateReportDto,
  ) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    if (attachment != null) {
      const file_image = report?.attachment;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'files');
    }

    await this.prisma.report.update({
      where: { id },
      data: {
        patientId,
        shift,
        author,
        title,
        report_text,
        filename,
        attachment,
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async remove(id: string) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return await this.prisma.report.delete({
      where: {
        id,
      },
    });
  }
}
