import { UserEntity } from "../entities/User";
import { NotFoundError } from "../errors/ApiError";
import { IUserRepository } from "../repositories/iUserAccountRepository";

export class FindByIdUseCase {
  constructor(private UserRepository: IUserRepository) { }

  async execute(id: string): Promise<UserEntity | null> {
    const checkUserExist = await this.UserRepository.findById(id);

    if (checkUserExist === null) {
      throw new NotFoundError('User not found!');
    }

    return await this.UserRepository.findById(id);
  }
}