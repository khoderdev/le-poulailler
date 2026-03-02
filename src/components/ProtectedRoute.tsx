import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkSession } from "../store/adminSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
