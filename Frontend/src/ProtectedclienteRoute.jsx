import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/contextoAutenticacion";

function ProtectedClientRoute() {
  const { loading, isAuthenticated, user } = useAuth();
  console.log(loading, isAuthenticated);

  if (loading) return <h1> ..Loading</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  if (user.role !== "cliente") return <Navigate to="/clientePage" replace />; // 🔥 SOLO CLIENTE PUEDE PASAR

  return <Outlet />;
}

export default ProtectedClientRoute;
