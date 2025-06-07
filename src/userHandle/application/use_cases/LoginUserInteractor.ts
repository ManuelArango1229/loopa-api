import InvalidLoginError from "../../domain/errors/InvalidLoginError";
import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type RefreshTokenRepositoryPort from "../repositories/RefreshTokenRepositoryPort";
import type PasswordHasher from "../services/PasswordHashedServicePort";
import type TokenGeneratorServicePort from "../services/TokenGeneratorServicePort";
import type TokenResponse from "../types/TokenResponse";

class LoginUserInteractor {
	constructor(
		private userRepository: UserRepositoryPort,
		private tokenGeneratorService: TokenGeneratorServicePort,
		private passwordHashed: PasswordHasher,
		private refreshTokenRepositoryPort: RefreshTokenRepositoryPort,
	) {}

	async execute(
		email: string,
		password: string,
	): Promise<TokenResponse | Error> {
		const foundUser = await this.userRepository.findByEmail(email);
		if (!foundUser) {
			return new InvalidLoginError("User Not Found");
		}

		await this.passwordHashed.compare(password, foundUser.password);
		if (!(await this.passwordHashed.compare(password, foundUser.password))) {
			return new InvalidLoginError("Password Invalid");
		}
		if (!foundUser.id) {
			return new Error("User ID is missing");
		}
		const existingToken =
			await this.refreshTokenRepositoryPort.getRefreshTokenByUserId(
				foundUser.id,
			);

		if (existingToken) {
			await this.refreshTokenRepositoryPort.deleteRefreshTokenByUserId(
				foundUser.id,
			);
		}

		const accessToken = await this.tokenGeneratorService.generateAccessToken(
			foundUser.id,
		);
		const refreshToken = await this.tokenGeneratorService.generateRefreshToken(
			foundUser.id,
		);
		this.refreshTokenRepositoryPort.saveRefreshToken(
			foundUser.id,
			refreshToken,
		);
		return {
			accessToken,
			refreshToken,
			user: {
				id: foundUser?.id,
				name: foundUser?.name,
				email: foundUser?.email,
			},
		};
	}
}

export default LoginUserInteractor;
