import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  console.log("CoursesList loaded");

  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [search, setsearch] = useState('')
  const [courses, setcourses] = useState([])

  useEffect(() => {
    //       console.log("input:", input);
    // console.log("cleanedInput:", input?.trim().toLowerCase());
    // console.log("allCourses:", allCourses);

    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      const cleanedInput = input?.trim().toLowerCase();

      if (cleanedInput) {
        const result = tempCourses.filter((course) =>
          course.courseTitle.toLowerCase().includes(cleanedInput)
        );
        setFilteredCourse(result);
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

      
  useEffect(() => {
    if(search !== "") {
      let filteredCourses = allCourses.filter(course => course?.title.startsWith(search))
      setFilteredCourse(filteredCourses)
    }
    else {
      setFilteredCourse(allCourses)
    }
  },[search])

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <div className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-600 rounded pl-3">
            <input
            onChange={(e) => setsearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search for courses"
            className="w-full h-full outline-none text-gray-500/80"
          />
          </div>
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt=""
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
