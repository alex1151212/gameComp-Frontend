import React, { useEffect } from "react";
import useAuth from "../../hook/auth/useAuth";
import { Navigate } from "react-router-dom";
interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
  const { auth, currentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser || auth) logout();
    console.log("logout");
  }, []);

  return <Navigate to={"/home"} />;
};
export default Logout;
