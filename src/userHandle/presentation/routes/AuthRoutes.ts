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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    await userController.forgotPassword(email);
    res.status(200).json({ message: "Correo de restablecimiento enviado" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message || "Error enviando el correo" });
  }
});

export default router;
