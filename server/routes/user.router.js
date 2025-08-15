import express from "express";
import {
  changeRole,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import isLoggedin from "../middleware/isLoggedin.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser)

router.get("/logout", logoutUser);

router.get("/profile", isLoggedin, getUser);

router.put("/update-role", isLoggedin, changeRole);

export default router;
