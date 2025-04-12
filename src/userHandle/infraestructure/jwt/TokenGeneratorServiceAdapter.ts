import "dotenv-flow/config";
import type TokenGeneratorServicePort from "../../application/services/TokenGeneratorServicePort";
import type TokenPayload from "../../application/types/TokenPayload";
import jwt from "jsonwebtoken";

export class TokenGeneratorServiceAdapter implements TokenGeneratorServicePort {
  generateAccessToken(payload: string): Promise<string> {
    if (!process.env.SECRET_ACCESS_TOKEN_KEY) {
      throw new Error("Secret key for access token is not defined");
    }
    return Promise.resolve(
      jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN_KEY, {
        expiresIn: "1h",
      }),
    );
  }
  generateRefreshToken(payload: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  verifyAccessToken(token: string): Promise<TokenPayload | Error> {
    throw new Error("Method not implemented.");
  }
  verifyRefreshToken(token: string): Promise<TokenPayload | Error> {
    throw new Error("Method not implemented.");
  }
  revokeRefreshToken(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
