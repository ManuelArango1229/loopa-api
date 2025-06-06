import cookieParser from "cookie-parser";
import dotenvFlow from "dotenv-flow";
import express from "express";
import habitRoutes from "./habitHandle/presentation/routes/HabitRoutes";
import errorHandler from "./shared/ErrorHandler";
import { authMiddleware } from "./userHandle/middlewares/AuthMiddleware";
import userRoutes from "./userHandle/presentation/routes/AuthRoutes";
dotenvFlow.config();

dotenvFlow.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/habits", authMiddleware, habitRoutes);

app.get("/", (req, res) => {
	res.json({
		message: "API Habit Tracker",
	});
});
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
