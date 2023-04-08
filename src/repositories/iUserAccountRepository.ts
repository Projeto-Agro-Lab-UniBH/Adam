import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { UserEntity } from "../entities/User";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<UserEntity>;
  update(data: IUpdateUserDTO): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByRA(ra: number): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}