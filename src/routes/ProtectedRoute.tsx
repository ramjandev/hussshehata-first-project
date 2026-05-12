import { useAppSelector } from "@/store/hook";
import type { RootState } from "@/store/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useAppSelector((state: RootState) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
