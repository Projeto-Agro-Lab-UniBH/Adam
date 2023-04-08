import bcrypt from "bcrypt";
import { UserEntity } from "../entities/User";
import { BadRequestError, NotFoundError } from "../errors/ApiError";
import { IUserRepository } from "../repositories/iUserAccountRepository";

interface IRequestPutDTO {
  id: string;
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

export class UpdateUserAccountUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IRequestPutDTO): Promise<UserEntity> {
    const checkUserExist = await this.userRepository.findById(data.id);

    if (checkUserExist === null) {
      throw new NotFoundError('User not found!');
    }

    if (data.profile_photo && !data.profile_photo.startsWith('data:image/png;base64')) {
      throw new BadRequestError('Invalid file format.');
    }

    const raAlreadyExists = await this.userRepository.findByRA(data.ra);

    if (raAlreadyExists != null) {
      throw new BadRequestError('Academic record already exists.');
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyExists != null) {
      throw new BadRequestError('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 8)

    return await this.userRepository.update({
      ...data,
      password: hashedPassword
    })
  }
}