import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { FilesAzureService } from '../files/file.azure.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FilesAzureService,
  ) {}

  async create({ username, email, password }: CreateUserDto) {
    const emailAlreadyExists = await this.prisma.user.findFirst({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const hash = await bcrypt.hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
    });

    return user;
  }

  async getAll() {
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        profile_photo: true,
        username: true,
        email: true,
        password: false,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    return user;
  }

  async update(
    id: string,
    dto: {
      username?: string;
      email: string;
      password: string;
    },
  ) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userAlreadyExists) {
      throw new NotFoundException('Not found user.');
    }

    const hash = await bcrypt.hash(dto.password, 8);

    await this.prisma.user.update({
      where: { id },
      data: {
        username: dto.username,
        email: dto.email,
        password: hash,
      },
    });
  }

  async remove(id: string) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userAlreadyExists) {
      throw new NotFoundException('Not found user.');
    }

    return await this.prisma.user.delete({ where: { id } });
  }

  async uploadImage(id: string, fileUrl: string, containerName: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    const file_image = user?.profile_photo;
    let getfile = '';

    if (file_image) {
      getfile = file_image.split('/').pop();
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        profile_photo: fileUrl,
      },
    });

    await this.fileService.deleteFile(getfile, containerName);
  }
}
