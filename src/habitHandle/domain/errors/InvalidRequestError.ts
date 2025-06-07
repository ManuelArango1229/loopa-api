import AppError from "../../../shared/globalError/AppError";

class InvalidRequestError extends AppError {
	constructor(message = "Invalid request", details?: unknown) {
		super(message, 400, "INVALID_REQUEST", details);
	}
}

export default InvalidRequestError;
