import type { Request, Response } from "express";
import type {
  RegisterRequest,
  RegisterResponse,
} from "../../application/types";
import type TokenResponse from "../../application/types/TokenResponse";
import type LoginUserInteractor from "../../application/use_cases/LoginUserInteractor";
import type LogoutUserInteractor from "../../application/use_cases/LogoutUserInteractor";
import type RefreshTokensInteractor from "../../application/use_cases/RefreshTokensInteractor";
import type { RegisterUseCase } from "../../application/use_cases/RegisterUseCase";
import type ResetPasswordEmailInteractor from "../../application/use_cases/ResetPasswordEmailInteractor";
import type ResetPasswordInteractor from "../../application/use_cases/ResetPasswordInteractor";
import type UpdateUserInteractor from "../../application/use_cases/UpdateUserInteractor";
import InvalidRequestError from "../../domain/errors/InvalidRequestError";
import LoginSchema from "../validation/LoginSchema";
import RegisterSchema from "../validation/RegisterSchema";
import type { LoginResponse } from "./types/LoginResponse";
import type { RefreshTokenResponse } from "./types/RefreshTokenResponse";
import InvalidLoginError from "../../domain/errors/InvalidLoginError";

export class UserController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginInteractor: LoginUserInteractor,
    private resetpasswordEmailInteractor: ResetPasswordEmailInteractor,
    private resetpasswordInteractor: ResetPasswordInteractor,
    private logoutInteractor: LogoutUserInteractor,
    private refreshTokensInteractor: RefreshTokensInteractor,
    private updateuserInteractor: UpdateUserInteractor,
  ) {}

  /**
   * Registers a new user.
   * @param req Express request object containing the user information to be registered.
   * @param res Express response object.
   * @returns A response with a 201 status code and the created user if successful. Otherwise, a 400 status code and an error message.
   */

  async register(req: Request, res: Response): Promise<RegisterResponse> {
    const parsedBody = RegisterSchema.safeParse(req.body);

    if (!parsedBody.success) {
      throw new InvalidRequestError(
        "Body Validation Failed",
        parsedBody.error.format(),
      );
    }

    try {
      const createdUser: RegisterResponse = await this.registerUseCase.execute(
        parsedBody.data as RegisterRequest,
      );
      return createdUser;
    } catch (error: unknown) {
      throw new Error("Error in register");
    }
  }

  /**
   * Handles the login process.
   * @param req Express request object containing the user's credentials.
   * @param res Express response object.
   * @returns A response with a 200 status code and the generated token if successful, otherwise a 400 status code and an error message.
   */
  async login(req: Request, res: Response): Promise<LoginResponse> {
    const parsedBody = LoginSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new InvalidRequestError(
        "Body Validation Failed",
        parsedBody.error.format(),
      );
    }
    const responseInteractor = await this.loginInteractor.execute(
      parsedBody.data.email,
      parsedBody.data.password,
    );
    if (responseInteractor instanceof Error) {
      throw responseInteractor;
    }
    const response: TokenResponse = responseInteractor;
    const userAgent = req.headers["user-agent"] ?? "";
    const isMobile =
      userAgent.includes("okhttp") || req.headers["x-mobile-app"] === "true";

    const { id, name, email: userEmail } = response.user;
    if (isMobile) {
      return {
        refreshToken: response.refreshToken,
        accessToken: response.accessToken,
        user: { id, name, email: userEmail },
      };
    }
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    return {
      accessToken: response.accessToken,
      user: { id, name, email: userEmail },
    };
  }

  async logout(req: Request, res: Response): Promise<{ message: string }> {
    const refreshToken = req.cookies.refreshToken.split(" ")[1];
    try {
      const responseInteractor =
        await this.logoutInteractor.execute(refreshToken);
      if (responseInteractor instanceof Error) {
        throw responseInteractor;
      }

      const userAgent = req.headers["user-agent"] ?? "";
      const isMobile =
        userAgent.includes("okhttp") || req.headers["x-mobile-app"] === "true";
      if (isMobile) {
        return { message: "Logout exitoso" };
      }
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return { message: "Logout exitoso" };
    } catch (error: unknown) {
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
    } catch (error: unknown) {
      throw new Error("Error in refresh token");
    }
  }

  /**
   * Handles the password reset request.
   * @param req Express request object containing the user's email.
   * @param res Express response object.
   * @returns A response with a 200 status code if the email was sent successfully, otherwise a 400 status code and an error message.
   */
  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      await this.resetpasswordEmailInteractor.execute(email);
      res.status(200).json({ message: "Correo de restablecimiento enviado" });
    } catch (error: unknown) {
      console.error("Error al enviar el correo de restablecimiento:", error);
    }
  }

  /**
   * Handles the password reset process.
   * @param req Express request object containing the reset token and new password.
   * @param res Express response object.
   * @returns A response with a 200 status code if the password was reset successfully, otherwise a 400 status code and an error message.
   */
  async resetPassword(req: Request, res: Response): Promise<Response> {
    const { token, newPassword } = req.body;

    try {
      await this.resetpasswordInteractor.execute(token, newPassword);
      return res
        .status(200)
        .json({ message: "Contraseña restablecida correctamente" });
    } catch (error: unknown) {
      throw new Error("Error al restablecer la contraseña");
    }
  }

  /**
   * Updates the user information.
   * @param req Express request object containing the user ID and updated data.
   * @param res Express response object.
   * @returns A response with a 200 status code if the user was updated successfully, otherwise a 400 status code and an error message.
   */
  async updateUser(req: Request, res: Response): Promise<Response> {
    const currentEmail = req.params.email;
    const { name, email, password } = req.body;

    try {
      await this.updateuserInteractor.execute({
        currentEmail,
        name,
        email,
        password,
      });

      return res
        .status(200)
        .json({ message: "Usuario actualizado correctamente" });
    } catch (error: unknown) {
      throw new Error("Error al actualizar el usuario");
    }
  }
}
