import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type PasswordHasher from "../services/PasswordHashedServicePort";
import type TokenGeneratorServicePort from "../services/TokenGeneratorServicePort";
import type TokenResponse from "../types/TokenResponse";

class LoginUserInteractor {
  constructor(
    private userRepository: UserRepositoryPort,
    private tokenGeneratorService: TokenGeneratorServicePort,
    private passwordHashed: PasswordHasher,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<TokenResponse | Error> {
    if (!email || !password) {
      return new Error("Email and password are required");
    }
    const foundUser = await this.userRepository.findByEmail(email);
    if (!foundUser) {
      return new Error("User not found");
    }
    if (await this.passwordHashed.compare(password, foundUser.password)) {
      return new Error("Invalid password");
    }
    if (!foundUser.id) {
      return new Error("User ID is missing");
    }
    const accessToken = await this.tokenGeneratorService.generateAccessToken(
      foundUser.id,
    );
    const refreshToken = await this.tokenGeneratorService.generateRefreshToken(
      foundUser.id,
    );
    this.tokenGeneratorService.saveRefreshToken(new Date(), refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
}

export default LoginUserInteractor;
