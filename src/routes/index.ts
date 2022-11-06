import { PrismaRepository } from "../repositories/implementations/PrismaRepository";
import { CreateUserAccountController } from "../controllers/create-user-account-controller";
import { CreateUserAccountUseCase } from "../usecases/create-user-account-usecase";
import { FindByIdUseCase } from "../usecases/find-by-id-usecase";
import { FindByIdController } from "../controllers/find-by-id-controller";
import { FindAllUseCase } from "../usecases/find-all-usecase";
import { FindAllController } from "../controllers/find-all-controller";
import { UpdateUserAccountUseCase } from "../usecases/update-user-account-usecase";
import { UpdateUserAccountController } from "../controllers/update-user-account-controller";
import { DeleteUserAccountUseCase } from "../usecases/delete-user-account-usecase";
import { DeleteUserAccountController } from "../controllers/delete-user-account-controller";
import { LoginController } from "../authentication/login";
import { LogoutController } from "../authentication/logout";

const prismaUserRepository = new PrismaRepository();

const createUserAccountUseCase = new CreateUserAccountUseCase(prismaUserRepository);
const createUserAccountController = new CreateUserAccountController(createUserAccountUseCase);

const loginController = new LoginController(prismaUserRepository);
const logoutController = new LogoutController();

const updateUserAccountUseCase = new UpdateUserAccountUseCase(prismaUserRepository);
const updateUserAccountController = new UpdateUserAccountController(updateUserAccountUseCase);

const deleteUserAccountUseCase = new DeleteUserAccountUseCase(prismaUserRepository);
const deleteUserAccountController = new DeleteUserAccountController(deleteUserAccountUseCase);

const findByIdUseCase = new FindByIdUseCase(prismaUserRepository);
const findByIdController = new FindByIdController(findByIdUseCase);

const findAllUseCase = new FindAllUseCase(prismaUserRepository);
const findAllController = new FindAllController(findAllUseCase);

export { createUserAccountController, loginController, logoutController, updateUserAccountController, deleteUserAccountController, findByIdController, findAllController }