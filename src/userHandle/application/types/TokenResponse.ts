import type { RegisterResponse } from "./RegisterResponse";

type TokenResponse = {
	accessToken: string;
	refreshToken: string;
	user: RegisterResponse;
};

export default TokenResponse;
