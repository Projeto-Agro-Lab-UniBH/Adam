import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email: string): Promise<Partial<UserEntity> | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async getAll(): Promise<Partial<UserEntity>[] | null> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        profile_photo: true,
        username: true,
        email: true,
        password: false,
      },
    });
    if (!users) {
      return null;
    }
    return users;
  }

  async create({ username, email, password }: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async update(
    id: string,
    { profile_photo, username, email }: UpdateUserDto,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        profile_photo,
        username,
        email,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
