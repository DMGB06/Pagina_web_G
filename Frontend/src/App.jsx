import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import Home from "./pages/home";
import ContactUsPage from "./pages/contactusPage";

//paginas de admin
import AdminPage from "./pages/admin/adminPage";
import UsersPage from "./pages/admin/usersPage";
import MembershipsPage from "./pages/admin/MembershipsPage";
import InventarioPage from "./pages/admin/InventarioPage";
import SettingsPage from "./pages/admin/settingsPage";
import TrainersPage from "./pages/admin/trainersPage";
import ReservationPage from "./pages/admin/ReservationsPage";
//paginas de cliente
import ClientePage from "./pages/cliente/clientePage";

// Proteger rutas
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedClientRoute from "./ProtectedclienteRoute";

// Contextos
import { MembershipTypeProvider } from "./context/membershiptypecontext";
import { AuthProvider } from "./context/contextoAutenticacion";
import { UserProvider } from "./context/userContext";

// Componentes
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebaradmin";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// **Nuevo `Layout` que maneja Navbar y Sidebar**
function Layout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // El sidebar inicia abierto

  // Rutas donde NO queremos el Navbar
  const hideNavbarRoutes = [
    "/adminPage",
    "/clientePage",
    "/admin/users",
    "/admin/memberships",
    "/admin/inventario",
    "/admin/trainers",
    "/admin/settings",
    "/admin/reservations",
  ];

  // Rutas donde SÍ queremos mostrar el Sidebar
  // Rutas donde SÍ queremos mostrar el Sidebar
  const showSidebarRoutes = [
    "/adminPage",
    "/admin/users",
    "/admin/memberships",
    "/admin/inventario",
    "/admin/trainers",
    "/admin/settings",
    "/admin/reservations",
  ];

  return (
    <div className="flex">
      {/* 🔥 Sidebar solo en rutas admin */}
      {showSidebarRoutes.includes(location.pathname) && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}

      <div
        className={`transition-all duration-300 flex-1 ${
          showSidebarRoutes.includes(location.pathname)
            ? isSidebarOpen
              ? "ml-64" // Sidebar abierto
              : "ml-20" // Sidebar colapsado
            : ""
        }`}
      >
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

        <main className="">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MembershipTypeProvider>
        <UserProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contactUs" element={<ContactUsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 🔥 RUTA PROTEGIDA PARA ADMIN */}
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route
                  path="/admin/memberships"
                  element={<MembershipsPage />}
                />
                <Route path="/admin/inventario" element={<InventarioPage />} />
                <Route path="/admin/trainers" element={<TrainersPage />} />
                <Route
                  path="/admin/reservations"
                  element={<ReservationPage />}
                />
                <Route path="/admin/settings" element={<SettingsPage />} />
              </Route>

              {/* 🔥 RUTA PROTEGIDA PARA CLIENTE */}
              <Route element={<ProtectedClientRoute />}>
                <Route path="/clientePage" element={<ClientePage />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
        </UserProvider>
      </MembershipTypeProvider>
    </AuthProvider>
  );
}

export default App;
