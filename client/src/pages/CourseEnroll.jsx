import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Payment from "./Payment";

const CourseEnroll = () => {
  let { id } = useParams();
  let { allCourses } = useContext(AppContext);
  const [course, setCourse] = useState({});

  useEffect(() => {
    let foundCourse = allCourses?.find((c) => c?._id === id);
    setCourse(foundCourse);
  }, [allCourses, id]);

  function calculateTotal() {
    let total = course?.price + 0.18 * course?.price;
    return total?.toFixed(2);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Course Details */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
          <p className="text-lg text-gray-600 mt-2">
            Price: <span className="font-semibold">₹ {course?.price}</span>
          </p>
        </div>

        {/* Billing Summary */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Billing Summary
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Base Amount:</span>
              <span>₹ {course?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹ {(0.18 * course?.price).toFixed(2)}</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹ {calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-6 flex justify-end">
          <Payment course={course} amount={calculateTotal()} />
        </div>
      </div>
    </div>
  );
};

export default CourseEnroll;
