import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/contextoAutenticacion";
import { useEffect, useState } from "react";

function ProtectedAdminRoute() {
  const { loading, isAuthenticated, user } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  console.log(loading, isAuthenticated, user); // 👀 Debugging

  if (loading || showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-200 text-lg font-semibold">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || user.role !== "admin") return <Navigate to="/adminPage" replace />;

  return <Outlet />;
}

export default ProtectedAdminRoute;
