import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (user && user?._id && user?.role === 'admin' || user?.role === 'user') {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;
