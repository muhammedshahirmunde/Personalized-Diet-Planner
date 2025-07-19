// App.tsx
import { BrowserRouter, useNavigate, useRoutes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Loader from "./components/reusable/Loader";
import { ToastContainer } from "react-toastify";
import routes from "./route/route";
import "./App.css";
import { useDispatch } from "react-redux";
import { getAuthenticatedUser } from "./redux/actions/thunk";
import type { AppDispatch } from "./redux/store";


function AppRoutes() {
  const routing = useRoutes(routes);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        await dispatch(getAuthenticatedUser());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    getUserProfile();
  }, [dispatch, navigate]);

  return routing;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
        <ToastContainer style={{ color: "black" }} autoClose={2000} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
