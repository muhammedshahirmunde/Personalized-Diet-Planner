import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
// import TrialStatsCard from "../pages/user/TrialStats";
import UserDashboard from "../pages/user/UserDashboard";
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const UserProfilePage = lazy(() => import("../pages/user/UserProfilePage"));
const BMIViewPage = lazy(() => import("../pages/user/BMIView"));

const routes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  // Admin routes

  // User routes
  {
    path: "/user",
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
        children: [
          { index: true, element: <BMIViewPage /> },
          { path: "profile", element: <UserProfilePage /> },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
];

export default routes;
