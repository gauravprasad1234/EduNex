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

  function handleChange(e) {
    let { name, value } = e.target;
    setlogin((prev) => ({ ...prev, [name]: value }));
  }

  let { setisLoggedin } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/users/login", login, {
        withCredentials: true,
      });
      toast.success("Login Success");
      setisLoggedin(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-2"
          value={login.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-2"
          value={login.password}
          onChange={handleChange}
        />
        <button
          className="px-3 py-2 bg-blue-600 rounded-lg text-white ml-4"
          type="submit"
        >
          Login
        </button>

        <Link className="block" to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
