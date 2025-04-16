import dotenvFlow from "dotenv-flow";
dotenvFlow.config();
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./userHandle/presentation/routes/AuthRoutes";

dotenvFlow.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Habit Tracker",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
