import { register } from "module";
import User from "../../domain/entities/User";
import UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import { RegisterDTO } from "../dtos/RegisterDTO";
import { RegisterResponseDTO } from "../dtos/RegisterResponseDTO";
import { Encrypter } from "../services/Encrypter";


export class RegisterUseCase {

  constructor(
    private userRepository: UserRepositoryPort,
    private encrypter: Encrypter
  ) {}

  /**
   * Registers a new user.
   * @param user The dto containing the user information.
   */
  async execute(user: RegisterDTO): Promise<RegisterResponseDTO> {
    const hashedPassword = await this.encrypter.hash(user.password, 10);

    const userSaved = await this.userRepository.saveUser(
      new User(user.name, user.email, hashedPassword),
    );
    return new RegisterResponseDTO(userSaved.name, userSaved.email);
  }

}