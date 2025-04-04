export class Email {
  private _email: string;

  constructor(email: string) {
    if (!this.testEmail(email)) {
      throw new Error("Invalid Email");
    }
    this._email = email;
  }

  get value(): string {
    return this._email;
  }

  private testEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error("Invalid email format");
    }
    return true;
  }
}
