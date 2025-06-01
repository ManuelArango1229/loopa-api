import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import InvalidRequestError from "../domain/errors/InvalidRequestError";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof InvalidRequestError) {
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
