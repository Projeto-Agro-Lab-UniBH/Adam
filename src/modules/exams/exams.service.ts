import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { ExamRepository } from './repositories/exam.repository';
import { AnimalService } from '../animal/animal.service';

@Injectable()
export class ExamsService {
  constructor(
    private readonly repository: ExamRepository,
    private readonly animalService: AnimalService,
  ) {}

  async create({ patientId, name, data }: CreateExamDto) {
    const patientExists = await this.animalService.findOne(patientId);

    if (!patientExists) {
      throw new BadRequestException('Animal id not exist.');
    }

    return await this.repository.create({
      patientId,
      name,
      data,
    });
  }

  async findOne(id: string) {
    const exam = await this.repository.findById(id);

    if (!exam) {
      throw new NotFoundException('Not found exam.');
    }

    return exam;
  }

  async update(id: string, { name, data }: UpdateExamDto) {
    const examExists = await this.repository.findById(id);

    if (!examExists) {
      throw new NotFoundException('Not found exam.');
    }

    return await this.repository.update(id, {
      name,
      data,
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
