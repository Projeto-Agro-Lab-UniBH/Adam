import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportsRepository } from './repositories/reports.repository';
import { AnimalService } from '../animal/animal.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly repository: ReportsRepository,
    private readonly animalService: AnimalService,
  ) {}

  async create({ patientId, title, text }: CreateReportDto) {
    const patientExists = await this.animalService.findOne(patientId);

    if (!patientExists) {
      throw new BadRequestException('Animal id not exist.');
    }

    return await this.repository.create({
      patientId,
      title,
      text,
    });
  }

  async findOne(id: string) {
    const report = await this.repository.findById(id);

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return report;
  }

  async update(id: string, { title, text }: UpdateReportDto) {
    const report = await this.repository.findById(id);

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return await this.repository.update(id, {
      title,
      text,
    });
  }

  async remove(id: string) {
    const report = await this.repository.findById(id);

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return await this.repository.delete(id);
  }
}
