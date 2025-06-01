import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type PasswordHasherServicePort from "../services/PasswordHashedServicePort";

interface UpdateUserDTO {
	currentEmail: string;
	name?: string;
	email?: string;
	password?: string;
}

interface UpdateUserData {
	name?: string;
	email?: string;
	password?: string;
}

export class UpdateUserInteractor {
	constructor(
		private readonly userRepository: UserRepositoryPort,
		private encrypter: PasswordHasherServicePort,
	) {}

	async execute(data: UpdateUserDTO) {
		const user = await this.userRepository.findByEmail(data.currentEmail);
		if (!user) throw new Error("Usuario no encontrado");

		const updatedData: UpdateUserData = {};

		if (data.name) updatedData.name = data.name;
		if (data.email) updatedData.email = data.email;
		if (data.password) {
			updatedData.password = await this.encrypter.hash(data.password);
		}

		await this.userRepository.updateUser(user.email, updatedData);

		return { message: "Datos actualizados correctamente" };
	}
}

export default UpdateUserInteractor;
