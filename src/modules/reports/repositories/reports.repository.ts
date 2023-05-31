import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ReportEntity } from '../entities/report.entity';
import { CreateReportDto } from '../dtos/create-report.dto';
import { format } from 'date-fns';
import { UpdateReportDto } from '../dtos/update-report.dto';

@Injectable()
export class ReportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ReportEntity | null> {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      return null;
    }

    return report;
  }

  async getAllReportsByPatientId(
    patientId: string,
  ): Promise<ReportEntity[] | null> {
    const reports = await this.prisma.report.findMany({
      where: {
        patientId: {
          equals: patientId,
        },
      },
    });

    if (!reports) {
      return null;
    }

    return reports;
  }

  async create({
    patientId,
    shift,
    author,
    report_text,
    attachments,
  }: CreateReportDto): Promise<ReportEntity> {
    return await this.prisma.report.create({
      data: {
        patientId,
        shift,
        author,
        report_text,
        attachments,
        createdAt: format(new Date(), 'dd-MM-yyyy').toString(),
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async update(
    id: string,
    { patientId, shift, author, report_text, attachments }: UpdateReportDto,
  ): Promise<ReportEntity> {
    return await this.prisma.report.update({
      where: { id },
      data: {
        patientId,
        shift,
        author,
        report_text,
        attachments,
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.report.delete({
      where: {
        id,
      },
    });
  }
}
