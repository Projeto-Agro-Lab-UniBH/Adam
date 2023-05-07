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

  async create({
    patientId,
    title,
    text,
  }: CreateReportDto): Promise<ReportEntity> {
    return await this.prisma.report.create({
      data: {
        patientId,
        title,
        text,
        createdAt: format(new Date(), 'dd-MM-yyyy').toString(),
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async update(
    id: string,
    { title, text }: UpdateReportDto,
  ): Promise<ReportEntity> {
    return await this.prisma.report.update({
      where: { id },
      data: {
        title,
        text,
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
