import express from "express";
import cors from "cors";
import "dotenv/config";
import conncetDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import cookieParser from "cookie-parser";

// Initial Express
const app = express();

// connect to database
conncetDB();

import userRouter from "./routes/user.router.js";
import courseRouter from './routes/course.router.js'
import orderRouter from './routes/order.router.js'

// Middlewares
app.use(
  cors({
    origin: "https://edu-nex-steel.vercel.app",
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

app.use("/api/courses",courseRouter)

app.use("/api/orders",orderRouter)

// Port
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
