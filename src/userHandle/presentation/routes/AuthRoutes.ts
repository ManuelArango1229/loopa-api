import express from "express";
import { userController } from "../../dependencies";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const response = await userController.register(req, res);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await userController.login(req, res);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;

