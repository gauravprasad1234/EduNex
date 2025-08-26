import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "You are already registered" });
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      email,
      password: hash,
    });
    let token = jwt.sign({ name, email }, process.env.JWT_KEY,{ expiresIn: "10y" });
    res.cookie("token", token,{
      sameSite: "None",
      secure: true,
      httpOnly: true
    });
    return res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error registering user",
    });
  }
};

export const getUser = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.user.email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error getting user",
    });
  }
};

export const changeRole = async function (req, res) {
  try {
    let { role } = req.body;

    let user = await User.findOne({ email: req.user.email });
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    let updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        role: role || user.role,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Role Updated Successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating the role of user",
    });
  }
};

export const loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Not Registered" });
    }
    let isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY,{ expiresIn: "10y" });
      res.cookie("token", token,{
      sameSite: "None",
      secure: true,
      httpOnly: true
    });
      return res.status(200).json({ message: "Login Success" });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error logging in",
    });
  }
};

export const logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error logging out",
    });
  }
};
