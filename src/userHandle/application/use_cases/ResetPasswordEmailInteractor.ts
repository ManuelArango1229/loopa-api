import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type PasswordResetTokenPort from "../services/PasswordResetTokenPort";

/**
 * ResetPasswordEmailInteractor is responsible for handling the logic of sending a password reset email.
 */
class ResetPasswordEmailInteractor {
  constructor(
    private userRepository: UserRepositoryPort,
    private passwordResetService: PasswordResetTokenPort
  ) {}

  /**
   * Sends a password reset email to the user with the given email address.
   * @param email The email address of the user.
   * @throws Error if the user is not found or if the email could not be sent.
   */
  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado con ese correo.");
    }

    await this.passwordResetService.sendResetPasswordEmail(email);
  }
}

export default ResetPasswordEmailInteractor;