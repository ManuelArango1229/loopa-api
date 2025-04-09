import { Email, Password } from "../value_objects";

class User {
  private _id?: string;
  private _name: string;
  private _email: Email;
  private _password: Password;

  constructor(nombre: string, email: string, password: string, id?: string) {
    this._id = id;
    this._name = nombre;
    this._email = new Email(email);
    this._password = new Password(password);
  }

  get id(): string | undefined {
    return this._id;
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
