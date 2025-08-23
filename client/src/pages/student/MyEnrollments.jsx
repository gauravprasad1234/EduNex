import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Footer from "../../components/student/Footer";
import { Line } from "rc-progress";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCoursesDuration, navigate } =
    useContext(AppContext);

  const [progressArray] = useState([
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 3 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Content Section */}
      <div className="flex-grow md:px-36 px-4 sm:px-8 pt-10">
        <h1 className="text-2xl font-semibold mb-6">My Enrollments</h1>

        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="table-auto w-full text-sm text-left border-collapse">
            {/* ✅ Headings always visible */}
            <thead className="text-gray-900 border-b border-gray-300 bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Completed</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index];
                const percent = progress
                  ? (progress.lectureCompleted * 100) / progress.totalLectures
                  : 0;

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    {/* Course */}
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={course.courseThumbnail}
                        alt=""
                        className="w-14 sm:w-20 md:w-28 rounded-md"
                      />
                      <div className="flex-1">
                        <p className="mb-1 font-medium text-sm sm:text-base">
                          {course.courseTitle}
                        </p>
                        <Line
                          strokeWidth={2}
                          percent={percent}
                          strokeColor="#2563eb"
                          className="bg-gray-200 rounded-full"
                        />
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {calculateCoursesDuration(course)}
                    </td>

                    {/* Completed */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {progress &&
                        `${progress.lectureCompleted} / ${progress.totalLectures}`}{" "}
                      Lectures
                    </td>

                    {/* Status Button */}
                    <td className="px-4 py-3">
                      <button
                        className={`px-4 py-1.5 rounded text-white text-sm font-medium ${
                          progress &&
                          progress.lectureCompleted / progress.totalLectures ===
                            1
                            ? "bg-green-600"
                            : "bg-blue-600"
                        }`}
                        onClick={() => navigate("/player/" + course._id)}
                      >
                        {progress &&
                        progress.lectureCompleted / progress.totalLectures === 1
                          ? "Completed"
                          : "On Going"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Footer fixed at the bottom */}
      <Footer />
    </div>
  );
};

export default MyEnrollments;
