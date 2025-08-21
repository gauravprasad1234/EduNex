import express from 'express'
import isLoggedin from '../middleware/isLoggedin.js'
import { createOrder, verifyPayment } from '../controllers/order.controller.js'

const router = express.Router()

router.post("/create-order",isLoggedin,createOrder)

router.post("/verify-payment/:courseId",isLoggedin,verifyPayment)

export default router