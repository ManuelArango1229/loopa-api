import LoginUserInteractor from "./application/use_cases/LoginUserInteractor";
import { RegisterUseCase } from "./application/use_cases/RegisterUseCase";
import { RefreshTokenRepositoryAdapter } from "./infraestructure/database/repositories/RefreshTokenRepositoryAdapter";
import { UserRepositoryAdapter } from "./infraestructure/database/repositories/UserRepositoryAdapter";
import { TokenGeneratorServiceAdapter } from "./infraestructure/jwt/TokenGeneratorServiceAdapter";
import { BcryptService } from "./infraestructure/services/BcryptService";
import { UserController } from "./presentation/controllers/UserController";
import ResetPasswordInteractor from "./application/use_cases/ResetPasswordInteractor";
import PasswordResetTokenAdapter from "./infraestructure/services/PasswordResetTokenAdapter";


const refreshTokenRepository = new RefreshTokenRepositoryAdapter();
const tokenGeneratorServices = new TokenGeneratorServiceAdapter();
const passwordResetService = new PasswordResetTokenAdapter();
const encrypter = new BcryptService();
const userRepository = new UserRepositoryAdapter();
const registerUseCase = new RegisterUseCase(userRepository, encrypter);
const resetPasswordInteractor = new ResetPasswordInteractor(userRepository, passwordResetService);
const loginUserInteractor = new LoginUserInteractor(
  userRepository,
  tokenGeneratorServices,
  encrypter,
  refreshTokenRepository,
);
const userController = new UserController(registerUseCase, loginUserInteractor, resetPasswordInteractor);

export { userController };
