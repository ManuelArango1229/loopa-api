import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type PasswordResetTokenPort from "../services/PasswordResetTokenPort";

class ResetPasswordInteractor {
  constructor(
    private userRepository: UserRepositoryPort,
    private passwordResetService: PasswordResetTokenPort
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado con ese correo.");
    }

    await this.passwordResetService.sendResetPasswordEmail(email);
  }
}

export default ResetPasswordInteractor;