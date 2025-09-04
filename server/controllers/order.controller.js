import Razorpay from "razorpay";
import User from "../models/User.js";
import Course from "../models/Course.js";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async function (req, res) {
  try {
    let { amount, courseId } = req.body;

    let student = await User.findOne({ email: req.user.email });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Payment Failed" });
  }
};

export const verifyPayment = async function (req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      instructor,
    } = req.body;
    const { courseId } = req.params;

    let course = await Course.findOne({ _id: courseId });

    const student = await User.findOne({ email: req.user.email });
    if (!student) return next(new ApiError(404, "Student not found"));

    // STEP 1: Verify the signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid signature" });
    }

    // STEP 2: Fetch payment from Razorpay and check actual status
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status === "captured") {
      // Payment successful, enroll student
      if (!course.studentsEnrolled.includes(student._id)) {
        course.studentsEnrolled.push(student._id);
      }

      if (!student.enrolledCourses.includes(course._id)) {
        student.enrolledCourses.push(course._id);
      }

      await student.save();
      await course.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified and captured successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment not captured",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error processing payment" });
  }
};
