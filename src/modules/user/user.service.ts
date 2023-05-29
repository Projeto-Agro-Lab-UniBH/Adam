import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create({ profile_photo, username, email, password }: CreateUserDto) {
    const emailAlreadyExists = await this.repository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const hash = await bcrypt.hash(password, 8);

    return await this.repository.create({
      profile_photo: profile_photo,
      username: username,
      email: email,
      password: hash,
    });
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    return user;
  }

  async update(
    id: string,
    { profile_photo, username, email, password }: UpdateUserDto,
  ) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    const hash = await bcrypt.hash(password, 8);

    return this.repository.update(id, {
      profile_photo,
      username,
      email,
      password: hash,
    });
  }

  async remove(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    return await this.repository.delete(id);
  }
}
