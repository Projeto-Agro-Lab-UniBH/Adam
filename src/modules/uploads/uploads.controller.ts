import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureFileService } from '../azure/azure.file.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly azureFileService: AzureFileService) {}

  @HttpCode(HttpStatus.OK)
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const upload = await this.azureFileService.uploadFile(file, 'image');
    return { imageUrl: upload };
  }

  @HttpCode(HttpStatus.OK)
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const upload = await this.azureFileService.uploadFile(file, 'files');
    return { fileUrl: upload };
  }
}
