import type { RefreshTokenWithUser } from "../types/RefreshTokenResponse";

interface RefreshTokenRepositoryPort {
  saveRefreshToken(userId: string, token: string): Promise<void>;
  getRefreshToken(token: string): Promise<RefreshTokenWithUser | null>;
  deleteRefreshToken(token: string): Promise<boolean>;
}

export default RefreshTokenRepositoryPort;
