import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./content/AuthContext";
import Loading from "./Components/Content-loader/Loading";

export const ProtectedRoute = () => {
  const { isAuth, loading } = useAuth();

  if (loading) return <Loading />;

  if (!isAuth && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};
