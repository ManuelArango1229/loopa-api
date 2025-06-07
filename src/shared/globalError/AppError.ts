abstract class AppError extends Error {
	public readonly statusCode: number;
	public readonly code: string;
	public readonly details?: unknown;

	constructor(
		message: string,
		statusCode: number,
		code: string,
		details?: unknown,
	) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
	}
}

export default AppError;
