import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type PasswordHasherServicePort from "../services/PasswordHashedServicePort";
import type PasswordResetTokenPort from "../services/PasswordResetTokenPort";

export class ResetPasswordInteractor {
	constructor(
		private passwordResetTokenPort: PasswordResetTokenPort,
		private userRepository: UserRepositoryPort,
		private encrypter: PasswordHasherServicePort,
	) {}

	/**
	 * Resetea la contraseña del usuario.
	 * @param token El token de restablecimiento.
	 * @param newPassword La nueva contraseña del usuario.
	 */
	async execute(token: string, newPassword: string): Promise<void> {
		const isValidToken =
			await this.passwordResetTokenPort.verifyResetToken(token);

		if (!isValidToken) {
			throw new Error("Token de restablecimiento no válido o expirado.");
		}

		const resetRequest = await this.userRepository.findByResetToken(token);

		if (!resetRequest) {
			throw new Error("No se encontró el token de restablecimiento.");
		}

		const hashedPassword = await this.encrypter.hash(newPassword);

		await this.userRepository.updatePassword(
			resetRequest.email,
			hashedPassword,
		);

		await this.passwordResetTokenPort.deleteResetToken(token);
	}
}

export default ResetPasswordInteractor;
