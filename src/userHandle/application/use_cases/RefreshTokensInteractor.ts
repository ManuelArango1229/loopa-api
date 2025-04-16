import type RefreshTokenRepositoryPort from "../repositories/RefreshTokenRepositoryPort";
import type TokenGeneratorServicePort from "../services/TokenGeneratorServicePort";
import type TokenResponse from "../types/TokenResponse";

class RefreshTokensInteractor {
  constructor(
    private refreshTokenRepository: RefreshTokenRepositoryPort,
    private tokenGeneratorService: TokenGeneratorServicePort,
  ) {}
  async execute(refreshToken: string): Promise<TokenResponse> {
    const userId =
      await this.refreshTokenRepository.getRefreshToken(refreshToken);
    if (!userId) throw new Error("Invalid refresh token");
    await this.refreshTokenRepository.deleteRefreshToken(refreshToken);
    const newRefreshToken =
      await this.tokenGeneratorService.generateRefreshToken(userId.user.id);
    await this.refreshTokenRepository.saveRefreshToken(
      userId.user.id,
      newRefreshToken,
    );
    const newAccessToken = await this.tokenGeneratorService.generateAccessToken(
      userId.user.id,
    );
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: userId.user.id,
        name: userId.user.nombre,
        email: userId.user.email,
      },
    };
  }
}

export default RefreshTokensInteractor;
