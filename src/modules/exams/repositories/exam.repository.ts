import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ExamEntity } from '../entities/exam.entity';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { format } from 'date-fns';
import { UpdateExamDto } from '../dtos/update-exam.dto';

@Injectable()
export class ExamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ExamEntity | null> {
    const exam = await this.prisma.exam.findUnique({
      where: {
        id,
      },
    });

    if (!exam) {
      return null;
    }

    return exam;
  }

  async create({ patientId, name, data }: CreateExamDto): Promise<ExamEntity> {
    return await this.prisma.exam.create({
      data: {
        patientId,
        name,
        data,
        createdAt: format(new Date(), 'dd-MM-yyyy').toString(),
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async update(id: string, { name, data }: UpdateExamDto): Promise<ExamEntity> {
    return await this.prisma.exam.update({
      where: {
        id,
      },
      data: {
        name,
        data,
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.exam.delete({ where: { id } });
  }
}
