export class Password {
	private _password: string;

	constructor(password: string) {
		if (!this.testPassword(password)) {
			throw new Error("Invalid Password");
		}
		this._password = password;
	}

	get value(): string {
		return this._password;
	}

	private testPassword(password: string): boolean {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

		if (!regex.test(password)) {
			throw new Error(
				"Error: password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
			);
		}

		return true;
	}
}
