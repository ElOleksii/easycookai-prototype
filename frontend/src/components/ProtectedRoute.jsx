import { Navigate } from "react-router-dom";
import { useUser } from "../storage/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div>Завантаження...</div>;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
