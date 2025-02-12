import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import Home from "./pages/home";
import AdminPage from "./pages/AdminPage";
import ClientePage from "./pages/clientePage";

import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedClientRoute from "./ProtectedclienteRoute";

import { AuthProvider } from "./context/contextoAutenticacion";
import Navbar from "./components/navbar";
import { useLocation } from "react-router-dom"; // 🔥 Importa aquí
import ContactUsPage from "./pages/contactusPage";

function Layout({ children }) {
  const location = useLocation(); // 🔥 Detecta la ruta actual
  const hideNavbarRoutes = ["/adminPage", "/clientePage"]; // 🔥 Rutas sin Navbar

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} {/* Condición para ocultar Navbar */}
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contactUs" element={<ContactUsPage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 🔥 RUTA PROTEGIDA PARA ADMIN */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/adminPage" element={<AdminPage />} />
            </Route>

            {/* 🔥 RUTA PROTEGIDA PARA CLIENTE */}
            <Route element={<ProtectedClientRoute />}>
              <Route path="/clientePage" element={<ClientePage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
