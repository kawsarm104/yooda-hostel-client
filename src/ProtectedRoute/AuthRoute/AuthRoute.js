import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const AuthRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  let location = useLocation();
  if (isLoading) {
    return "loading";
  }
  if (!user.email) {
    return children;
  }
  return <Navigate to="/dashboard" state={{ from: location }} />;
};

export default AuthRoute;
