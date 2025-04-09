import express from "express";
import userRoutes from "./userHandle/presentation/routes/AuthRoutes";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Habit Tracker",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
