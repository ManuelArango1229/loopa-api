import type { Request, Response } from "express";
import type { RegisterUseCase } from "../../application/use_cases/RegisterUseCase";
import type {
  RegisterRequest,
  RegisterResponse,
} from "../../application/types";
import type LoginUserInteractor from "../../application/use_cases/LoginUserInteractor";

export class UserController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginInteractor: LoginUserInteractor,
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
}
