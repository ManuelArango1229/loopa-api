interface PasswordHasherServicePort {
	hash(value: string): Promise<string>;
	compare(plain: string, hash: string): Promise<boolean>;
}

export default PasswordHasherServicePort;
