import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { format } from 'date-fns';
import { AzureFileService } from '../azure/azure.file.service';

@Injectable()
export class ExamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: AzureFileService,
    private readonly patientService: PatientService,
  ) {}

  async create({
    patientId,
    date,
    author,
    type_of_exam,
    annotations,
    filename,
    fileUrl,
    fileSize,
  }: CreateExamDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new BadRequestException('Animal id not exist.');
    }

    return await this.prisma.exam.create({
      data: {
        patientId,
        date,
        author,
        type_of_exam,
        annotations,
        filename,
        fileUrl,
        fileSize,
        createdAt: format(new Date(), 'dd-MM-yyyy').toString(),
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    return exam;
  }

  async getAllExamsByPatientId(patientId: string) {
    const result = await this.prisma.exam.findMany({
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
      date,
      author,
      type_of_exam,
      annotations,
      filename,
      fileUrl,
      fileSize,
    }: UpdateExamDto,
  ) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    if (fileUrl != null) {
      const file_image = exam?.fileUrl;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'files');
    }

    await this.prisma.exam.update({
      where: { id },
      data: {
        patientId,
        date,
        author,
        type_of_exam,
        annotations,
        filename,
        fileUrl,
        fileSize,
        updatedAt: format(new Date(), 'dd-MM-yyyy').toString(),
      },
    });
  }

  async remove(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    if (exam.fileUrl != null) {
      const file_image = exam?.fileUrl;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'files');
    }

    await this.prisma.exam.delete({
      where: { id },
    });
  }
}
