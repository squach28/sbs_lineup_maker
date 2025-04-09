import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const AuthRequired = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRequired;
