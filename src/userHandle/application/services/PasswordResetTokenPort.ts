interface PasswordResetTokenPort {
	generateResetToken(): string;
	verifyResetToken(token: string): Promise<boolean>;
	sendResetPasswordEmail(email: string): Promise<void>;
	deleteResetToken(token: string): Promise<void>;
}

export default PasswordResetTokenPort;
