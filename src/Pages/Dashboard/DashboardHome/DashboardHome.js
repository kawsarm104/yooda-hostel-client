import React from "react";
import useAuth from "../../../Hooks/useAuth";

const DashboardHome = () => {
  const {user}=useAuth()
  return <div style={{minHeight:"100vh"}} className="text-end"><h5>Welcome: {user.email}</h5></div>;
};

export default DashboardHome;
