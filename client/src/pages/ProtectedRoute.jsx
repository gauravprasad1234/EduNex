import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  let { isLoggedin } = useContext(AppContext);
  if(!isLoggedin) {
    return <Navigate to={'/login'}/>
  }

  return children
};

export default ProtectedRoute;
