import { UserEntity } from "../entities/User";
import { NotFoundError } from "../errors/ApiError";
import { IUserRepository } from "../repositories/iUserAccountRepository";

export class FindAllUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(): Promise<UserEntity[]> {
    const findAllUsers = await this.userRepository.findAll();

    if (findAllUsers.length === 0) {
      throw new NotFoundError("No data found!");
    }

    return findAllUsers;
  }
}