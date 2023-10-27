import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hook/auth/useAuth";

interface AuthLayoutProps {}
const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to={"/login"} />;

  return <Outlet />;
};

export default AuthLayout;
