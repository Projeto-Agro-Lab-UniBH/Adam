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
    fileUrl,
    fileSize,
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
        fileUrl,
        fileSize,
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
      fileUrl,
      fileSize,
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

    if (fileUrl != null) {
      const file_image = report?.fileUrl;
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
        fileUrl,
        fileSize,
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

    if (report.fileUrl != null) {
      const file_image = report?.fileUrl;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'files');
    }

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    await this.prisma.report.delete({
      where: {
        id,
      },
    });
  }
}
