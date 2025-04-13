import type UserRepositoryPort from "../../domain/repositories/UserRepositoryPort";
import type RefreshTokenRepositoryPort from "../repositories/RefreshTokenRepositoryPort";
import type PasswordHasher from "../services/PasswordHashedServicePort";
import type TokenGeneratorServicePort from "../services/TokenGeneratorServicePort";
import type TokenResponse from "../types/TokenResponse";

class LoginUserInteractor {
  constructor(
    private userRepository: UserRepositoryPort,
    private tokenGeneratorService: TokenGeneratorServicePort,
    private passwordHashed: PasswordHasher,
    private refreshTokenRepositoryPort: RefreshTokenRepositoryPort,
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
    console.log(
      await this.passwordHashed.compare(password, foundUser.password),
    );
    if (!(await this.passwordHashed.compare(password, foundUser.password))) {
      return new Error("Invalid password");
    }
    console.log("User found", foundUser);
    if (!foundUser.id) {
      return new Error("User ID is missing");
    }
    const accessToken = await this.tokenGeneratorService.generateAccessToken(
      foundUser.id,
    );
    const refreshToken = await this.tokenGeneratorService.generateRefreshToken(
      foundUser.id,
    );
    this.refreshTokenRepositoryPort.saveRefreshToken(
      foundUser.id,
      refreshToken,
    );
    return {
      accessToken,
      refreshToken,
      user: {
        id: foundUser?.id,
        name: foundUser?.name,
        email: foundUser?.email,
      },
    };
  }
}

export default LoginUserInteractor;
