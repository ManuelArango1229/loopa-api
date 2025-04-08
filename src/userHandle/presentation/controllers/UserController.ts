import { Request, Response } from "express";
import { RegisterUseCase } from "../../application/use_cases/RegisterUseCase";
import { RegisterDTO } from "../../application/dtos/RegisterDTO";

export class UserController {
  constructor(private registerUseCase: RegisterUseCase) {}

  /**
   * Registers a new user.
   * @param req Express request object containing the user information to be registered.
   * @param res Express response object.
   * @returns A response with a 201 status code and the created user if successful. Otherwise, a 400 status code and an error message.
   */
  async register(req: Request, res: Response): Promise<Response> {
    const user: RegisterDTO = req.body;

    try {
      const createdUser = await this.registerUseCase.execute(user);
      return res.status(201).json(createdUser);
    } catch (error: any) {
      console.error("Error en registro:", error);
      return res.status(400).json({ message: error.message });
    }
  }
}