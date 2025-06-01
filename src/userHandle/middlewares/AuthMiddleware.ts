import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];

	if (!token) {
		res.status(401).json({ message: "Token no proporcionado" });
		return;
	}

	try {
		if (!process.env.SECRET_ACCESS_TOKEN_KEY)
			throw new Error("Secret key not defined");
		const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN_KEY) as {
			id: string;
		};
		req.userId = payload.id;
		next();
	} catch (err) {
		res.status(403).json({ message: "Token inválido o expirado" });
	}
}
