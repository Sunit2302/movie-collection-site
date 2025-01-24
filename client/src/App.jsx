import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? <Navbar /> : null}
      <Outlet />
    </>
  );
};

export default App;
