import bcrypt from "bcrypt";
import type PasswordHashedServicePort from "../../application/services/PasswordHashedServicePort";

export class BcryptService implements PasswordHashedServicePort {
  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  } /**
   * Hashes a given string using bcrypt.
   * @param value The value to be hashed.
   * @returns A Promise that resolves to the hashed string.
   */
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
}

