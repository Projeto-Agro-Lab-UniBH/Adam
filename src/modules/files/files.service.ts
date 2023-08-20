import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dtos/create-file.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AzureFileService } from '../azure/azure.file.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: AzureFileService,
    private readonly patientService: PatientService,
  ) {}

  async create({ patientId, filename, fileUrl, fileSize }: CreateFileDto) {
    const patientExists = await this.patientService.findOne(patientId);

    if (!patientExists) {
      throw new NotFoundException('Animal id not exist.');
    }

    return await this.prisma.files.create({
      data: {
        patientId,
        filename,
        fileUrl,
        fileSize,
      },
    });
  }

  async getAllFilesByPatientId(patientId: string) {
    const result = await this.prisma.files.findMany({
      where: {
        patientId: patientId,
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async findOne(id: string) {
    const result = await this.prisma.files.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException('Not found!');
    }

    return result;
  }

  async remove(id: string) {
    const result = await this.prisma.files.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException('Not found!');
    }

    if (result.fileUrl != null) {
      const file_image = result?.fileUrl;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'files');
    }

    await this.prisma.files.delete({
      where: { id },
    });
  }
}
