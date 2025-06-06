import express from "express";
import type { Request } from "express";
import { habitController } from "../../Dependencies";

const router = express.Router();

router.post("/", async (req: Request, res, next) => {
	try {
		const response = await habitController.createHabit(req);
		res.status(201).json(response);
	} catch (error) {
		next(error);
	}
});

router.get("/", async (req: Request, res, next) => {
	try {
		const response = await habitController.getAllHabitsByDate(req);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
});

export default router;
