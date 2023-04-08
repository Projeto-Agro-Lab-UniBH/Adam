import bcrypt from "bcrypt";
import { UserEntity } from "../entities/User";
import { BadRequestError } from "../errors/ApiError";
import { IUserRepository } from "../repositories/iUserAccountRepository";

interface IRequestPostDTO {
  profile_photo: string | null;
  fullname: string;
  birthdate: string;
  home_state: string;
  email: string;
  cell_phone_contact: string | null;
  residential_phone_contact: string | null;
  campus_name: string;
  profession: string;
  ra: number;
  password: string;
}

export class CreateUserAccountUseCase {
  constructor(private UserRepository: IUserRepository) { }

  async execute(data: IRequestPostDTO): Promise<UserEntity> {
    if (data.profile_photo && !data.profile_photo.startsWith('data:image/png;base64')) {
      throw new BadRequestError('Invalid file format.');
    }

    const userAlreadyExists = await this.UserRepository.findByEmail(data.email);

    if (userAlreadyExists != null) {
      throw new BadRequestError('Email already exists.');
    }

    const raAlreadyExists = await this.UserRepository.findByRA(data.ra);

    if (raAlreadyExists != null) {
      throw new BadRequestError('Academic record already exists.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 8)

    return await this.UserRepository.create({
      ...data,
      password: hashedPassword
    });
  }
}