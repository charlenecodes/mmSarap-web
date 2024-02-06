import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="login" />}</div>;
};
