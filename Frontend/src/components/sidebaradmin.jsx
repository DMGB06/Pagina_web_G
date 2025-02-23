import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/contextoAutenticacion";
import {
  FiUser,
  FiPackage,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiClipboard,
  FiCalendar,
} from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out flex flex-col z-50 ${
        isOpen ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-6 text-center flex items-center">
        <h2
          className={`text-2xl font-bold text-red-500 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Admin Panel
        </h2>
      </div>

      {/* 📌 Sección de Navegación */}
      <nav className="mt-4 flex-grow">
        <ul>
          {[
            { to: "/admin/users", icon: <FiUsers />, label: "Usuarios" },
            { to: "/admin/memberships", icon: <FiClipboard />, label: "Membresías" },
            { to: "/admin/inventario", icon: <FiPackage />, label: "Inventario" },
            { to: "/admin/trainers", icon: <FiUser />, label: "Entrenadores" },
            { to: "/admin/reservations", icon: <FiCalendar />, label: "Reservas" }, 
            { to: "/admin/settings", icon: <FiSettings />, label: "Configuraciones" },
          ].map((item, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-700 flex items-center">
              <span className="text-xl">{item.icon}</span>
              <Link
                to={item.to}
                className={`ml-3 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 🔴 Botón de Cerrar Sesión fijado abajo */}
      <div className="px-4 py-3 hover:bg-gray-700 flex items-center absolute bottom-4 w-full">
        <FiLogOut className="text-xl" />
        <button
          className={`ml-3 transition-all duration-300 ${
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
