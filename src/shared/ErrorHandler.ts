import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import InvalidRequestErrorHabit from "../habitHandle/domain/errors/InvalidRequestError";
import InvalidRequestError from "../userHandle/domain/errors/InvalidRequestError";

const errorHandler: ErrorRequestHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (
		err instanceof InvalidRequestError ||
		err instanceof InvalidRequestErrorHabit
	) {
		res.status(400).json({
			error: {
				message: err.message,
				details: err.details,
			},
		});
		return;
	}

	res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
