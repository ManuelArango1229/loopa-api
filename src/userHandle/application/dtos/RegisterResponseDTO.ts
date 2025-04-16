/**
 * Data transfer object (DTO) representing the response of a user registration process.
 *
 */
export class RegisterResponseDTO {
  public id: string;
  public name: string;
  public email: string;

  //TODO: Add id in response?
  constructor(name: string, email: string) {
    this.id = "";
    this.name = name;
    this.email = email;
  }
}