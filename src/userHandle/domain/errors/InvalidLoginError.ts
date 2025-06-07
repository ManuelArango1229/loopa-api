import AppError from "../../../shared/globalError/AppError";

class InvalidLoginError extends AppError {
  constructor(message = "Invalid email or password", details?: unknown) {
    super(message, 401, "INVALID_LOGIN", details);
  }
}

export default InvalidLoginError;
