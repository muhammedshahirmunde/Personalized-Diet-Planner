import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();


  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return (
      <Outlet />
  );
};

export default ProtectedRoute;
