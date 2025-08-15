import React, { useContext, useState } from "react";

import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Register = () => {
    const [register, setregister] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    let {setisLoggedin} = useContext(AppContext)

    function handleChange(e) {
        let {name,value} = e.target 
        setregister(prev => ({...prev,[name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/api/users/register",register,{withCredentials: true})
            toast.success("Registration Successfull")
            setisLoggedin(true)
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-2"
          value={register.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-2"
          value={register.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-2"
          value={register.password}
          onChange={handleChange}
        />
        <button
          className="px-3 py-2 bg-blue-600 rounded-lg text-white"
          type="submit"
        >
          Create
        </button>

        <Link className="block" to={'/login'}>Login</Link>
      </form>
    </div>
  );
};

export default Register;
