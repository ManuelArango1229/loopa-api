interface CredentialsValidatorService {
  validate(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
