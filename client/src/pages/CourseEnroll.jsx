import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Payment from "./Payment";

const CourseEnroll = () => {
  let { id } = useParams();
  let { allCourses } = useContext(AppContext);
  const [course, setcourse] = useState({})

  useEffect(() => {
    let foundCourse = allCourses?.find(c => c?._id === id)
    setcourse(foundCourse)
  }, []);

  function calculateTotal() {
    let total = course?.price + 0.18 * course?.price
    return total
  }

  return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="w-[60%] h-[400px] flex items-center justify-between px-8 border-2 border-zinc-800">
        <div className="w-[49%] h-[40%] p-4 border-2 border-zinc-900">
          <p className="text-2xl font-semibold">{course?.title}</p>
          <p className="text-lg font-semibold">₹ {course?.price}</p>
        </div>
        <div className="w-[49%] h-[70%] border-2 border-zinc-900">
          <p className="flex justify-around"><span>Base Amount:</span><span>₹ {course?.price}</span></p>
          <p className="flex justify-around"><span>GST:</span><span>18%</span></p>
          <p className="flex justify-around"><span>Total:</span><span>{calculateTotal()}</span></p>

          <Payment course = {course} amount = {calculateTotal()}/>
        </div>
      </div>
    </div>
  );
};

export default CourseEnroll;
