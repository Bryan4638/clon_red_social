import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Spinner } from "@heroui/react";

export const ProtectedRoute = () => {
  const { isAuth, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner color="success" />
      </div>
    );

  if (!isAuth && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};
