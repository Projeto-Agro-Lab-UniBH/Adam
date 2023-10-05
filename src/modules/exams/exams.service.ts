import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
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
    username,
    execution_date,
    runtime,
    execution_period,
    responsible_person,
    type_of_exam,
    exam_name,
    diagnosis,
    prognosis,
    description_of_treatment,
  }: CreateExamDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new BadRequestException('Animal id not exist.');
    }

    return await this.prisma.exams.create({
      data: {
        patientId,
        username,
        execution_date,
        runtime,
        execution_period,
        responsible_person,
        type_of_exam,
        exam_name,
        diagnosis,
        prognosis,
        description_of_treatment,
      },
    });
  }

  async findOne(id: string) {
    const exam = await this.prisma.exams.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    return exam;
  }

  async update(
    id: string,
    {
      patientId,
      username,
      execution_date,
      runtime,
      execution_period,
      responsible_person,
      type_of_exam,
      exam_name,
      diagnosis,
      prognosis,
      description_of_treatment,
    }: UpdateExamDto,
  ) {
    const exam = await this.prisma.exams.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    await this.prisma.exams.update({
      where: { id },
      data: {
        patientId,
        username,
        execution_date,
        runtime,
        execution_period,
        responsible_person,
        type_of_exam,
        exam_name,
        diagnosis,
        prognosis,
        description_of_treatment,
      },
    });
  }

  async remove(id: string) {
    const exam = await this.prisma.exams.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    await this.prisma.exams.delete({
      where: { id },
    });
  }
}
