import type { Request, Response } from "express";
import type { RegisterUseCase } from "../../application/use_cases/RegisterUseCase";
import type {
  RegisterRequest,
  RegisterResponse,
} from "../../application/types";
import type LoginUserInteractor from "../../application/use_cases/LoginUserInteractor";
import type TokenResponse from "../../application/types/TokenResponse";
import type LogoutUserInteractor from "../../application/use_cases/LogoutUserInteractor";

export class UserController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginInteractor: LoginUserInteractor,
    private logoutInteractor: LogoutUserInteractor,
  ) {}

  /**
   * Registers a new user.
   * @param req Express request object containing the user information to be registered.
   * @param res Express response object.
   * @returns A response with a 201 status code and the created user if successful. Otherwise, a 400 status code and an error message.
   */
  async register(req: Request, res: Response): Promise<Response> {
    const user: RegisterRequest = req.body;

    try {
      const createdUser: RegisterResponse =
        await this.registerUseCase.execute(user);
      return res.status(201).json(createdUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const responseInteractor = await this.loginInteractor.execute(
        email,
        password,
      );
      if (responseInteractor instanceof Error) {
        return res.status(400).json({ message: responseInteractor.message });
      }
      const response: TokenResponse = responseInteractor;
      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      const { id, name, email: userEmail } = response.user;
      return res.status(200).json({
        accessToken: response.accessToken,
        user: { id, name, email: userEmail },
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies.refreshToken;
    console.log("refreshToken controller: ", refreshToken);
    try {
      const responseInteractor =
        await this.logoutInteractor.execute(refreshToken);
      if (responseInteractor instanceof Error) {
        return res.status(500).json({ message: responseInteractor.message });
      }
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({ message: "Logout exitoso" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
