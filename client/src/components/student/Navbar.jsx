import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
// import { assets} from '../../assets/assets'
// import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import logo from "../../assets/logo1.jpg";
import axios from "axios";

const Navbar = () => {
  // const location = useLocation();
  const { navigate, isEducator } = useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  // const { openSignIn } = useClerk();
  // const { user } = useUser();

  let { user, setUser, isLoggedin } = useContext(AppContext);

  console.log(isLoggedin)

  async function getLoggedinUser() {
    try {
      let user = await axios.get(
        "https://edunex-5ms8.onrender.com/api/users/profile",
        {
          withCredentials: true,
        }
      );

      setUser(user.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getLoggedinUser();
  }, []);

  return (
    <div
      className={`w-full flex items-center h-[80px] justify-between px-4 sm:px-10 md:px-14 border-b border-gray-300 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <div className="flex gap-2 items-center">
        <img className="w-9 h-9" src={logo} alt="" />
        <h1 className="text-2xl font-bold">EduNex</h1>
      </div>
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {isLoggedin && (
            <>
              <button
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {user?.role === "educator" && "Educator Dashboard"}
              </button>
              <Link to="/my-enrollments"> My Enrollments</Link>
            </>
          )}
        </div>
        {isLoggedin && (
          <Link
            to={"/profile"}
            className="w-[30px] text-black h-[30px] rounded-full bg-orange-500 flex items-center justify-center"
          >
            {user?.name?.split("")[0].toUpperCase()}
          </Link>
        )}

        {!isLoggedin && (
          <Link
            to={"/register"}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </Link>
        )}
      </div>

      {/* For Phone Screens */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-2 sm:gap-5 text-xs ">
          {user && (
            <>
              <button
                onClick={() => {
                  navigate("/educator");
                }}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}{" "}
              </button>
              | <Link to="/my-enrollments"> My Enrollments</Link>
            </>
          )}
          {/* {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="" />
            </button>
          
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
