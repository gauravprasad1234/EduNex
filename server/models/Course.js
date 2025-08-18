import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    educatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
    courseRatings: [
      {
        rating: Number
      }
    ],
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "content"
      }
    ]
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
