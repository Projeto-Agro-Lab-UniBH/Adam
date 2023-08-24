import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { AzureFileService } from '../azure/azure.file.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: AzureFileService,
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

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    if (data.profile_photo != null) {
      const file_image = user?.profile_photo;
      let getfile = '';

      if (file_image) {
        getfile = file_image.split('/').pop();
      }

      await this.fileService.deleteFile(getfile, 'image');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        profile_photo: data.profile_photo,
        username: data.username,
        email: data.email,
      },
    });
  }

  // implementação em andamento
  // async updatePassword(id: string, { password }: UpdateUserPasswordDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('Not found user.');
  //   }

  //   const hash = await bcrypt.hash(password, 8);

  //   await this.prisma.user.update({
  //     where: { id },
  //     data: {
  //       profile_photo: user.profile_photo,
  //       username: user.username,
  //       email: user.email,
  //       password: hash,
  //     },
  //   });
  // }

  async remove(id: string) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userAlreadyExists) {
      throw new NotFoundException('Not found user.');
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
