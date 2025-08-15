import express from "express";
import cors from "cors";
import "dotenv/config";
import conncetDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import cookieParser from "cookie-parser";

// Initial Express
const app = express();

// connect to database
await conncetDB();

import userRouter from "./routes/user.router.js";

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.post("/clerk", express.json(), clerkWebhooks);

app.use("/api/users", userRouter);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
