import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from "../redux/hook";

export default function PrivateRoute() {
  const { token } = useAppSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
