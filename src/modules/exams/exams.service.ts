import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { ExamRepository } from './repositories/exam.repository';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class ExamsService {
  constructor(
    private readonly repository: ExamRepository,
    private readonly patientService: PatientService,
  ) {}

  async create({ patientId, name }: CreateExamDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new BadRequestException('Animal id not exist.');
    }

    return await this.repository.create({
      patientId,
      name,
    });
  }

  async findOne(id: string) {
    const exam = await this.repository.findById(id);

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    return exam;
  }

  async update(id: string, { name }: UpdateExamDto) {
    const examExists = await this.repository.findById(id);

    if (!examExists) {
      throw new NotFoundException('Not found exam.');
    }

    return await this.repository.update(id, {
      name,
    });
  }

  async remove(id: string) {
    const examExists = await this.repository.findById(id);

    if (!examExists) {
      throw new NotFoundException('Not found exam.');
    }

    return await this.repository.delete(id);
  }
}
