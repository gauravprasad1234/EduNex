import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String,required: true},
    imageUrl: { type: String},
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student"
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
