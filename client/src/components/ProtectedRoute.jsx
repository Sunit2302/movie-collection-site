import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log("ProtectedRoute User:", user);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
