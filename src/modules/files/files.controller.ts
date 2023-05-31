import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

interface FileParams {
  fileName: string;
}

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    console.log(file);
    return 'success';
  }

  @Get('get-file-by-name/:fileName')
  async getFile(@Res() res: Response, @Param() params: FileParams) {
    const filePath = path.join(
      __dirname,
      '../../../uploads/' + params.fileName,
    );

    const fileContent = fs.readFileSync(filePath);
    const base64Data = fileContent.toString('base64');

    return res.send(base64Data);
  }
}
