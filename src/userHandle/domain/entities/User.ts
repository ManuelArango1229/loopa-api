import { Email, Password } from "../value_objects";

class User {
  private _name: string;
  private _email: Email;
  private _password: Password;

  constructor(nombre: string, email: string, password: string) {
    this._name = nombre;
    this._email = new Email(email);
    this._password = new Password(password);
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email.value;
  }

  get password(): string {
    return this._password.value;
  }
}

export default User;
