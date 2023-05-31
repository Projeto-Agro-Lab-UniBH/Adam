import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportsRepository } from './repositories/reports.repository';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly repository: ReportsRepository,
    private readonly patientService: PatientService,
  ) {}

  async create({
    patientId,
    shift,
    author,
    report_text,
    attachments,
  }: CreateReportDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new BadRequestException('Animal id not exist.');
    }

    return await this.repository.create({
      patientId,
      shift,
      author,
      report_text,
      attachments,
    });
  }

  async findOne(id: string) {
    const report = await this.repository.findById(id);

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return report;
  }

  async getAllReportsByPatientId(patientId: string) {
    const reports = await this.repository.getAllReportsByPatientId(patientId);
    return reports;
  }

  async update(
    id: string,
    { patientId, shift, author, report_text, attachments }: UpdateReportDto,
  ) {
    const report = await this.repository.findById(id);

    if (!report) {
      throw new NotFoundException('Not found report.');
    }

    return await this.repository.update(id, {
      patientId,
      shift,
      author,
      report_text,
      attachments,
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
