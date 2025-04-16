import express from "express";
import  userRoutes  from "./userHandle/presentation/routes/AuthRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Habit Tracker",
  })
})

export default app;

