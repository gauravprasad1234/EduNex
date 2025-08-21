import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let { user, setisLoggedin, setUser } = useContext(AppContext);
  const [role, setRole] = useState(user?.role || "");

  const navigate = useNavigate();

  async function getLoggedinUser() {
    try {
      let res = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  async function changeRole() {
    try {
      await axios.put(
        "http://localhost:5000/api/users/update-role",
        { role },
        { withCredentials: true }
      );
      getLoggedinUser();
      toast.success("Role Updated Successfully 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function handleLogout() {
    try {
      await axios.get("http://localhost:5000/api/users/logout", {
        withCredentials: true,
      });
      toast.success("Logout Successful ✅");
      setisLoggedin(false);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (!user) {
      getLoggedinUser();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#ddfbfe" }}>
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute right-6 top-6 text-sm font-medium text-red-500 hover:text-red-700 transition"
        >
          Logout
        </button>

        {/* User Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hello, {user?.name || "User"}
        </h1>
        <p className="text-gray-500 mb-6">
          Manage your profile settings below
        </p>

        {/* Role Selection */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Select Role
        </h2>
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
              className="accent-gray-800"
            />
            <span className="text-gray-700">Student</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="educator"
              checked={role === "educator"}
              onChange={() => setRole("educator")}
              className="accent-gray-800"
            />
            <span className="text-gray-700">Educator</span>
          </label>
        </div>

        {/* Update Button */}
        <button
          onClick={changeRole}
          className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black transition"
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default Profile;
