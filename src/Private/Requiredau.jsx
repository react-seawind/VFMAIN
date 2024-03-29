import { Navigate } from 'react-router-dom';
export default function RequireAuth({ children }) {
  const currentUser = sessionStorage.getItem('logindata');

  return currentUser ? children : <Navigate to="/login" replace />;
}
