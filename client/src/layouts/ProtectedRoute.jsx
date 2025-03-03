import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contex/AuthContex';

const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
