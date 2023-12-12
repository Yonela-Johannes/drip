import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (user && user?._id && user?.role === 'admin' || user?.role === 'user') {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RegisterRoute;
