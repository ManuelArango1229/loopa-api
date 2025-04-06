interface RefreshTokenRepositoryPort {
  saveRefreshToken(userId: string, token: string): Promise<void>;
  getRefreshToken(token: string): Promise<string | null>;
  deleteRefreshToken(token: string): Promise<boolean>;
}

export default RefreshTokenRepositoryPort;
