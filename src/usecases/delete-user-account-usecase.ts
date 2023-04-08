import { NotFoundError } from "../errors/ApiError";
import { IUserRepository } from "../repositories/iUserAccountRepository";

export class DeleteUserAccountUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(id: string): Promise<void> {
    const checkUserExist = await this.userRepository.findById(id);

    if (checkUserExist === null) {
      throw new NotFoundError('User not found!');
    }

    await this.userRepository.delete(id);
  }
}