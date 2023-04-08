import { prisma } from "../../prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { UserEntity } from "../../entities/User";
import { IUserRepository } from "../iUserAccountRepository";

export class PrismaRepository implements IUserRepository {
  async create({
    profile_photo,
    fullname,
    birthdate,
    home_state,
    email,
    cell_phone_contact,
    residential_phone_contact,
    campus_name,
    profession,
    ra,
    password
  }: ICreateUserDTO): Promise<UserEntity> {
    return await prisma.user.create({
      data: {
        profile_photo,
        fullname,
        birthdate,
        home_state,
        email,
        cell_phone_contact,
        residential_phone_contact,
        campus_name,
        profession,
        ra,
        password
      },
    });
  }

  async update({
    id,
    profile_photo,
    fullname,
    birthdate,
    home_state,
    email,
    cell_phone_contact,
    residential_phone_contact,
    campus_name,
    profession,
    ra,
    password
  }: IUpdateUserDTO): Promise<UserEntity> {
    return await prisma.user.update({
      where: { id },
      data: {
        profile_photo,
        fullname,
        birthdate,
        home_state,
        email,
        cell_phone_contact,
        residential_phone_contact,
        campus_name,
        profession,
        ra,
        password
      }
    })
  }

  async findAll(): Promise<UserEntity[]> {
    return await prisma.user.findMany();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await prisma.user.findUnique({
      where: {
        id
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByRA(ra: number): Promise<UserEntity | null> {
    return await prisma.user.findUnique({
      where: {
        ra
      }
    })
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}