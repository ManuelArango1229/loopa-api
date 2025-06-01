import User from "../../domain/entities/User";
import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type PasswordHasherServicePort from "../services/PasswordHashedServicePort";
import type { RegisterRequest, RegisterResponse } from "../types/";

export class RegisterUseCase {
	constructor(
		private userRepository: UserRepositoryPort,
		private encrypter: PasswordHasherServicePort,
	) {}

	/**
	 * Registers a new user.
	 * @param user The dto containing the user information.
	 */
	async execute(user: RegisterRequest): Promise<RegisterResponse> {
		const hashedPassword = await this.encrypter.hash(user.password);

		const userSaved = await this.userRepository.saveUser(
			new User(user.name, user.email, hashedPassword),
		);

		if (!userSaved.id) {
			throw new Error("User not saved");
		}

		return {
			id: userSaved.id,
			name: userSaved.name,
			email: userSaved.email,
		};
	}
}
