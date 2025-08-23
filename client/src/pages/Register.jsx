import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Register = () => {
  const [register, setregister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let { setisLoggedin } = useContext(AppContext);

  function handleChange(e) {
    let { name, value } = e.target;
    setregister((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        "https://edunex-5ms8.onrender.com/api/users/register",
        register,
        { withCredentials: true }
      );
      toast.success("Registration Successful 🎉");
      setisLoggedin(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign up to get started with our platform
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
              value={register.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
              value={register.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
              value={register.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-800 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
