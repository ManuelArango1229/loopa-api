import express from "express";
import { userController } from "../../dependencies";
import { authMiddleware } from "../../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const response = await userController.register(req, res);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await userController.login(req, res);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authMiddleware, async (req, res, next) => {
  try {
    const response = await userController.logout(req, res);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const response = await userController.refreshToken(req, res);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    await userController.forgotPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    await userController.resetPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:email", async (req, res, next) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
