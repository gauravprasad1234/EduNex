import Course from "../models/Course.js";
import User from "../models/User.js";

export const createCourse = async function (req, res) {
  try {
    let { title, description, price } = req.body;
    let educator = await User.findOne({ email: req.user.email });
    await Course.create({
      educatorId: educator._id,
      title,
      description,
      price,
    });
    return res.status(201).json({ message: "Course Created Successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error in creating the course",
    });
  }
};

export const readEducatorCourses = async function (req, res) {
  try {
    let educator = await User.findOne({
      email: req.user.email,
      role: "educator",
    });
    let courses = await Course.find({ educatorId: educator._id });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error reading courses",
    });
  }
};
