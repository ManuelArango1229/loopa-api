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
      await this.tokenGeneratorService.generateRefreshToken(userId);
    await this.refreshTokenRepository.saveRefreshToken(userId, newRefreshToken);
    const newAccessToken =
      await this.tokenGeneratorService.generateAccessToken(userId);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default RefreshTokensInteractor;
