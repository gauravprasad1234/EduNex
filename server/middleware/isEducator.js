import User from "../models/User.js";

async function isEducator(req, res, next) {
  try {
    let user = await User.findOne({ email: req.user.email });
    if (user.role === "educator") {
      next();
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "Error verifying role",
      });
  }
}

export default isEducator
