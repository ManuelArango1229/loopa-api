import type { Request, Response } from "express";
import type { RegisterUseCase } from "../../application/use_cases/RegisterUseCase";
import type {
  RegisterRequest,
  RegisterResponse,
} from "../../application/types";
import type LoginUserInteractor from "../../application/use_cases/LoginUserInteractor";
import type TokenResponse from "../../application/types/TokenResponse";
import type LogoutUserInteractor from "../../application/use_cases/LogoutUserInteractor";
import type RefreshTokensInteractor from "../../application/use_cases/RefreshTokensInteractor";
import type { LoginResponse } from "./types/LoginResponse";
import type { RefreshTokenResponse } from "./types/RefreshTokenResponse";

export class UserController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginInteractor: LoginUserInteractor,
    private logoutInteractor: LogoutUserInteractor,
    private refreshTokensInteractor: RefreshTokensInteractor,
  ) {}

  /**
   * Registers a new user.
   * @param req Express request object containing the user information to be registered.
   * @param res Express response object.
   * @returns A response with a 201 status code and the created user if successful. Otherwise, a 400 status code and an error message.
   */
  async register(req: Request, res: Response): Promise<RegisterResponse> {
    const user: RegisterRequest = req.body;

    try {
      const createdUser: RegisterResponse =
        await this.registerUseCase.execute(user);
      return createdUser;
    } catch (error: any) {
      throw new Error("Error in register");
    }
  }

  async login(req: Request, res: Response): Promise<LoginResponse> {
    const { email, password } = req.body;
    try {
      const responseInteractor = await this.loginInteractor.execute(
        email,
        password,
      );
      if (responseInteractor instanceof Error) {
        throw responseInteractor;
      }
      const response: TokenResponse = responseInteractor;
      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      const { id, name, email: userEmail } = response.user;
      return {
        accessToken: response.accessToken,
        user: { id, name, email: userEmail },
      };
    } catch (error: any) {
      throw new Error("Error in login");
    }
  }

  async logout(req: Request, res: Response): Promise<{ message: string }> {
    const refreshToken = req.cookies.refreshToken.split(" ")[1];
    try {
      const responseInteractor =
        await this.logoutInteractor.execute(refreshToken);
      if (responseInteractor instanceof Error) {
        throw responseInteractor;
      }
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return { message: "Logout exitoso" };
    } catch (error: any) {
      throw new Error("Error in logout");
    }
  }
  async refreshToken(
    req: Request,
    res: Response,
  ): Promise<RefreshTokenResponse> {
    const refreshToken = req.cookies.refreshToken.split(" ")[1];
    try {
      const responseInteractor =
        await this.refreshTokensInteractor.execute(refreshToken);
      if (responseInteractor instanceof Error) {
        throw responseInteractor;
      }
      res.cookie("refreshToken", responseInteractor.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      return {
        message: "Refresh token exitoso",
        accessToken: responseInteractor.accessToken,
      };
    } catch (error: any) {
      throw new Error("Error in refresh token");
    }
  }
}
