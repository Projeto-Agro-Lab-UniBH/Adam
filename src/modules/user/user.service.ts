import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { HelperFile } from '../../helper/FileHelper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
        imageUrl: true,
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

  async update(id: string, { username, email, password }: UpdateUserDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userAlreadyExists) {
      throw new NotFoundException('Not found user.');
    }

    const hash = await bcrypt.hash(password, 8);

    await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
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

  async updateProfilePhoto(id: string, file: string, fileName: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user.profile_photo === null || user.profile_photo === '') {
      return await this.prisma.user.update({
        where: { id },
        data: {
          profile_photo: file,
          imageUrl: process.env.HOST + '/profile-photo/' + fileName,
        },
      });
    } else {
      await HelperFile.removeFile(user.profile_photo);

      return await this.prisma.user.update({
        where: { id },
        data: {
          profile_photo: file,
          imageUrl:
            'http://localhost:' +
            process.env.HOST +
            '/user/profile-photo/' +
            fileName,
        },
      });
    }
  }
}
