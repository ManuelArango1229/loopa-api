import type RefreshTokenRepositoryPort from "../repositories/RefreshTokenRepositoryPort";
import type LogoutResponse from "../types/LogoutResponse";

class LogoutUserInteractor {
	constructor(private refreshTokenRepository: RefreshTokenRepositoryPort) {}

	async execute(refreshToken: string): Promise<LogoutResponse> {
		if (!refreshToken) {
			throw new Error("No refresh token provided");
		}
		const deleted =
			await this.refreshTokenRepository.deleteRefreshToken(refreshToken);
		if (!deleted) {
			return { message: "Logout failed" };
		}
		return { message: "Logout successful" };
	}
}

export default LogoutUserInteractor;
