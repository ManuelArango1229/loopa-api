import "dotenv-flow/config";
import jwt from "jsonwebtoken";
import type TokenGeneratorServicePort from "../../application/services/TokenGeneratorServicePort";
import type TokenPayload from "../../application/types/TokenPayload";

export class TokenGeneratorServiceAdapter implements TokenGeneratorServicePort {
	generateAccessToken(payload: string): Promise<string> {
		if (!process.env.SECRET_ACCESS_TOKEN_KEY) {
			throw new Error("Secret key for access token is not defined");
		}
		return Promise.resolve(
			jwt.sign({ sub: payload }, process.env.SECRET_ACCESS_TOKEN_KEY, {
				expiresIn: "1h",
			}),
		);
	}
	generateRefreshToken(payload: string): Promise<string> {
		if (!process.env.SECRET_REFRESH_TOKEN_KEY) {
			throw new Error("Secret key for refresh token is not defined");
		}
		return Promise.resolve(
			jwt.sign({ sub: payload }, process.env.SECRET_REFRESH_TOKEN_KEY, {
				expiresIn: "365d",
			}),
		);
	}
	verifyAccessToken(token: string): Promise<TokenPayload | Error> {
		if (!process.env.SECRET_ACCESS_TOKEN_KEY) {
			throw new Error("Secret key for access token is not defined");
		}
		try {
			const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN_KEY);
			return Promise.resolve(payload as TokenPayload);
		} catch (err) {
			throw new Error("Invalid access token");
		}
	}
	verifyRefreshToken(token: string): Promise<TokenPayload | Error> {
		if (!process.env.SECRET_REFRESH_TOKEN_KEY) {
			throw new Error("Secret key for refresh token is not defined");
		}
		try {
			const payload = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN_KEY);
			return Promise.resolve(payload as TokenPayload);
		} catch (err) {
			throw new Error("Invalid refresh token");
		}
	}
}
