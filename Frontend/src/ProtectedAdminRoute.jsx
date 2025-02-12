import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/contextoAutenticacion";

function ProtectedAdminRoute() {
  const { loading, isAuthenticated, user } = useAuth(); // EXTRAEMOS `user`

  console.log(loading, isAuthenticated, user); // 👀 Verifica que `user` no sea undefined

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!user || user.role !== "admin") return <Navigate to="/adminPage" replace />; // Evitamos errores con `!user`

  return <Outlet />;
}

export default ProtectedAdminRoute;
