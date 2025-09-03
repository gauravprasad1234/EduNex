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

export const getAllCourses = async function (req, res) {
  try {
    let courses = await Course.find().populate("educatorId");
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error reading courses",
    });
  }
};

export const getOneCourse = async function (req, res) {
  try {
    let { id } = req.params;
    let course = await Course.findOne({ _id: id });
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error reading courses",
    });
  }
};

export const enrollInCourse = async function (req, res) {
  try {
    let { id } = req.params;

    let student = await User.findOne({
      email: req.user.email,
    });

    let course = await Course.findOne({ _id: id });

    if (!course) {
      return next(
        new ApiError(404, "Course that you are looking for is not found")
      );
    }

    if (course.studentsEnrolled.includes(student._id)) {
      return next(
        new ApiError(409, "Student is already enrolled in this course")
      );
    }

    course.studentsEnrolled.push(student._id);
    student.enrolledCourses.push(course._id);
    await student.save();
    await course.save();

    return res
      .status(200)
      .json({ message: "Student is successfully enrolled in the course" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        error instanceof Error
          ? error.message
          : "Error in student enrollment of course"
      )
    );
  }
};
