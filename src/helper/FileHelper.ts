import { NotFoundException } from '@nestjs/common';
import { unlink } from 'fs';
import { Request } from 'express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

export class HelperFile {
  static async profileNameHash(
    req: Request,
    file: Express.Multer.File,
    cb: any,
  ) {
    const filename: string =
      path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
    const extension: string = path.parse(file.originalname).ext;

    return cb(null, `${filename}${extension}`);
  }

  static async removeFile(filePath: string) {
    try {
      await unlinkAsync(filePath);
    } catch (error) {
      throw new NotFoundException('File not found!');
    }
    return true;
  }
}
