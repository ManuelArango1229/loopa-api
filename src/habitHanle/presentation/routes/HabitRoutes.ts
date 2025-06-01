import expres, { Request } from "express";
import { habitController } from "../../Dependencies";

const router = expres.Router();

router.post("/create-habit", async (req: Request, res) => {
  try {
    const response = await habitController.createHabit(req);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
});

export default router;
