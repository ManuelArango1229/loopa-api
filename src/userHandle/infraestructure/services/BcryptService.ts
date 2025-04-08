import bcrypt from "bcrypt";
import { Encrypter } from "../../application/services/Encrypter";

export class BcryptService implements Encrypter {
  /**
   * Hashes a given string using bcrypt.
   * @param value The value to be hashed.
   * @returns A Promise that resolves to the hashed string.
   */
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
}