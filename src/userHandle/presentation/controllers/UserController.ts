import type { Request, Response } from "express";
import type { RegisterUseCase } from "../../application/use_cases/RegisterUseCase";
import type {
  RegisterRequest,
  RegisterResponse,
} from "../../application/types";
import type LoginUserInteractor from "../../application/use_cases/LoginUserInteractor";
import type ResetPasswordEmailInteractor from "../../application/use_cases/ResetPasswordEmailInteractor";
import type ResetPasswordInteractor from "../../application/use_cases/ResetPasswordInteractor";

export class UserController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginInteractor: LoginUserInteractor,
    private resetpasswordEmailInteractor: ResetPasswordEmailInteractor,
    private resetpasswordInteractor: ResetPasswordInteractor,

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
      console.error("Error en registro:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Handles the login process.
   * @param req Express request object containing the user's credentials.
   * @param res Express response object.
   * @returns A response with a 200 status code and the generated token if successful, otherwise a 400 status code and an error message.
   */
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    console.log("Login request controller:", req.body);
    try {
      const token = await this.loginInteractor.execute(email, password);
      console.log("Token generated controller:", token);
      return res.status(200).json({ token });
    } catch (error: any) {
      console.error("Error en login:", error);
      return res.status(400).json({ message: error.message });
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
      // Llamar al interactor para enviar el correo de restablecimiento
      await this.resetpasswordEmailInteractor.execute(email);
      res.status(200).json({ message: "Correo de restablecimiento enviado" });
    } catch (error: any) {
      console.error("Error al enviar el correo de restablecimiento:", error);
      res.status(400).json({ message: error.message });
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
      // Llamar al interactor para restablecer la contraseña
      await this.resetpasswordInteractor.execute(token, newPassword);
      return res.status(200).json({ message: "Contraseña restablecida correctamente" });
    } catch (error: any) {
      console.error("Error al restablecer la contraseña:", error);
      return res.status(400).json({ message: error.message });
    }
  }
}
