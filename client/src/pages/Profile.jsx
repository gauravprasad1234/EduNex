import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let { user,setisLoggedin } = useContext(AppContext);
  const [role, setRole] = React.useState(user?.role || "");

  const navigate = useNavigate();

  async function changeRole() {
    try {
      await axios.put(
        "http://localhost:5000/api/users/update-role",
        { role },
        { withCredentials: true }
      );
      toast.success("Role Updated Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function handleLogout() {
    try {
        let res = await axios.get("http://localhost:5000/api/users/logout",{withCredentials: true})
        console.log(res)
        setisLoggedin(false)
        navigate("/")
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-4">Hello, {user?.name}</h1>
      <h2>Role</h2>
      <span onClick={handleLogout} className="absolute right-5 top-32 text-red-500 cursor-pointer">Logout</span>
      <div className="flex gap-4 mt-2">
        <label>
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="educator"
            checked={role === "educator"}
            onChange={() => setRole("educator")}
          />
          Educator
        </label>
      </div>
      <button onClick={changeRole} className="px-3 py-2 bg-blue-600 rounded-lg mt-4 text-white">
        Change
      </button>
    </div>
  );
};

export default Profile;
