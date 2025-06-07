import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import AppError from "./globalError/AppError";

const errorHandler: ErrorRequestHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			message: err.message,
			code: err.code,
			details: err.details,
		});
	}
	console.error("Unhandled error:", err);
	res.status(500).json({
		error: {
			message: "An unexpected error occurred",
			code: "INTERNAL_SERVER_ERROR",
			details: err instanceof Error ? err.message : "Unknown error",
		},
	});
};

export default errorHandler;
