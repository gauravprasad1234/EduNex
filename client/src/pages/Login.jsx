import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let { setisLoggedin } = useContext(AppContext);

  function handleChange(e) {
    let { name, value } = e.target;
    setlogin((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/users/login", login, {
        withCredentials: true,
      });
      toast.success("Login Successful 🎉");
      setisLoggedin(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
              value={login.email}
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
              value={login.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-gray-800 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
