import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      let courses = await axios.get("http://localhost:5000/api/courses/read", {
        withCredentials: true,
      });
      setCourses(courses.data)
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  All Courses
                </th>
                <th className="px-4 py-3 font-semibold truncate">Price</th>
                <th className="px-4 py-3 font-semibold truncate">Student</th>
                <th className="px-4 py-3 font-semibold truncate">Published</th>
              </tr>
            </thead>

            <tbody className="text-gray-500 text-sm">
              {courses?.length === 0 ? <p>No Courses Found</p> : courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    
                    <span className="truncate hidden md:block">
                      {course?.title}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    ₹ {course?.price}
                  </td>

                  <td className="px-4 py-3">
                    {course?.studentsEnrolled?.length}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
