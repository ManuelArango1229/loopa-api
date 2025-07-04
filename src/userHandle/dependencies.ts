import LoginUserInteractor from "./application/use_cases/LoginUserInteractor";
import LogoutUserInteractor from "./application/use_cases/LogoutUserInteractor";
import RefreshTokensInteractor from "./application/use_cases/RefreshTokensInteractor";
import { RegisterUseCase } from "./application/use_cases/RegisterUseCase";
import ResetPasswordEmailInteractor from "./application/use_cases/ResetPasswordEmailInteractor";
import ResetPasswordInteractor from "./application/use_cases/ResetPasswordInteractor";
import UpdateUserInteractor from "./application/use_cases/UpdateUserInteractor";
import { RefreshTokenRepositoryAdapter } from "./infraestructure/database/repositories/RefreshTokenRepositoryAdapter";
import { UserRepositoryAdapter } from "./infraestructure/database/repositories/UserRepositoryAdapter";
import { TokenGeneratorServiceAdapter } from "./infraestructure/jwt/TokenGeneratorServiceAdapter";
import { BcryptService } from "./infraestructure/services/BcryptService";
import PasswordResetTokenAdapter from "./infraestructure/services/PasswordResetTokenAdapter";
import { UserController } from "./presentation/controllers/UserController";

const refreshTokenRepository = new RefreshTokenRepositoryAdapter();
const tokenGeneratorServices = new TokenGeneratorServiceAdapter();
const passwordResetService = new PasswordResetTokenAdapter();
const encrypter = new BcryptService();
const userRepository = new UserRepositoryAdapter();
const registerUseCase = new RegisterUseCase(userRepository, encrypter);
const loginUserInteractor = new LoginUserInteractor(
	userRepository,
	tokenGeneratorServices,
	encrypter,
	refreshTokenRepository,
);
const resetpasswordEmailInteractor = new ResetPasswordEmailInteractor(
	userRepository,
	passwordResetService,
);
const resetpasswordInteractor = new ResetPasswordInteractor(
	passwordResetService,
	userRepository,
	encrypter,
);
const logoutInteractor = new LogoutUserInteractor(refreshTokenRepository);

const refreshTokensInteractor = new RefreshTokensInteractor(
	refreshTokenRepository,
	tokenGeneratorServices,
);
const updateUserInteractor = new UpdateUserInteractor(
	userRepository,
	encrypter,
);
const userController = new UserController(
	registerUseCase,
	loginUserInteractor,
	resetpasswordEmailInteractor,
	resetpasswordInteractor,
	logoutInteractor,
	refreshTokensInteractor,
	updateUserInteractor,
);

export { userController };
