import type TokenPayload from "../types/TokenPayload";

interface TokenGeneratorServicePort {
  generateAccessToken(payload: string): Promise<string>;
  generateRefreshToken(payload: string): Promise<string>;
  verifyAccessToken(token: string): Promise<TokenPayload | Error>;
  verifyRefreshToken(token: string): Promise<TokenPayload | Error>;
  revokeRefreshToken(token: string): Promise<void>;
}

export default TokenGeneratorServicePort;
