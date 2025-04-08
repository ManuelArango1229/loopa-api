import { RegisterUseCase } from "./application/use_cases/RegisterUseCase";
import { UserRepositoryAdapter } from "./infraestructure/database/repositories/UserRepositoryAdapter";
import { BcryptService } from "./infraestructure/services/BcryptService";
import { UserController } from "./presentation/controllers/UserController";

const encrypter = new BcryptService();
const userRepository = new UserRepositoryAdapter();
const registerUseCase = new RegisterUseCase(userRepository, encrypter);
const userController = new UserController(registerUseCase);

export { userController };