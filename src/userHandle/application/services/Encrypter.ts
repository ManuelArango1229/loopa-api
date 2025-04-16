/**
 * Interface for encrypter. 
 */
export interface Encrypter {

  /**
   * hash function to encrypt the password.
   * @param value
   * @param salt
   */
  hash(value: string, salt: number): Promise<string>;
}