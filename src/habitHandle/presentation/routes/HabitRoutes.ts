import express from "express";
import type { Request } from "express";
import { habitController } from "../../Dependencies";

const router = express.Router();

router.post("/create-habit", async (req: Request, res, next) => {
	try {
		const response = await habitController.createHabit(req);
		res.status(201).json(response);
	} catch (error) {
		next(error);
	}
});

export default router;
