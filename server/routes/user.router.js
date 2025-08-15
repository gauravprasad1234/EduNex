import express from 'express'
import { changeRole, getUser, registerUser } from '../controllers/user.controller.js'
import isLoggedin from '../middleware/isLoggedin.js'

const router = express.Router()

router.post("/register",registerUser)

router.get("/profile",isLoggedin,getUser)

router.put("/update-role",isLoggedin,changeRole)

export default router