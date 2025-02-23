import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import {
  FiEye,
  FiSearch,
  FiPlusCircle,
  FiUser,
  FiMail,
  FiKey,
  FiSettings,
} from "react-icons/fi";

function UsersPage() {
  const {
    users,
    getUsersContext,
    createUserContext,
    errors: registerErrors,
  } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "cliente", // Por defecto cliente
  });

  useEffect(() => {
    if (registerErrors.length === 0 && showCreateModal) {
      setShowCreateModal(false);
      setNewUser({ username: "", email: "", password: "", role: "cliente" });
      getUsersContext(); // Recargar la lista de usuarios
    }
  }, [registerErrors]);

  // Filtrar usuarios según la búsqueda
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Crear Usuario
  const handleCreateUser = async (e) => {
    e.preventDefault(); // Evitar recargar la página

    // Validaciones antes de enviar la solicitud
    if (
      !newUser.username.trim() ||
      !newUser.email.trim() ||
      !newUser.password.trim()
    ) {
      return;
    }

    try {
      await createUserContext(newUser); // 🔥 Esperar respuesta de la API
    } catch (error) {
      console.error("Error al crear el usuario", error);
    }
  };
  return (
    <div className="p-8 min-h-screen bg-gray-700 text-white">
      {/* 🔥 ENCABEZADO PROFESIONAL */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center space-x-3 text-gray-200">
          <FaUsers className="text-blue-400 text-4xl" />
          <span>Gestión de Usuarios</span>
        </h1>
      </div>

      {/* 🔍 Barra de Búsqueda */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-lg transition"
        >
          <FiPlusCircle className="mr-2" /> Crear Usuario
        </button>
      </div>

      {/* 🔥 Tabla con cabecera fija y efecto blur cuando el modal está abierto */}
      <div
        className={`overflow-x-auto rounded-lg shadow-lg border border-gray-700 transition-all duration-300
  ${
    selectedUser || showCreateModal
      ? "blur-sm opacity-50 pointer-events-none"
      : ""
  }`}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
            <thead className="sticky top-0 bg-gray-900 text-gray-200 z-10">
              <tr>
                <th className="py-3 px-6 text-left">Usuario</th>
                <th className="py-3 px-6 text-left">Correo</th>
                <th className="py-3 px-6 text-center">Rol</th>
                <th className="py-3 px-6 text-center">Membresía</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No hay usuarios disponibles.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="py-4 px-6 flex items-center space-x-3">
                      <FaUserCircle className="text-yellow-400 text-3xl" />
                      <span className="font-medium text-gray-200">
                        {user.username}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{user.email}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${
                      user.role === "admin"
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                      >
                        {user.role === "admin" ? "Administrador" : "Cliente"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {user.membership ? (
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition mx-auto"
                        >
                          <FiEye className="mr-2" /> Ver Membresía
                        </button>
                      ) : (
                        <span className="text-gray-400">Sin membresía</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              Crear Nuevo Usuario
            </h2>

            {/* 🚨 Mostrar errores si existen */}
            {registerErrors.map((error, i) => (
              <div className="bg-red-500 p-2 mb-2 rounded-lg" key={i}>
                {error}
              </div>
            ))}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiUser className="text-blue-400 text-xl" />
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Nombre de usuario"
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-green-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Correo electrónico"
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex items-center space-x-3">
                <FiKey className="text-red-400 text-xl" />
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>
              {/* 🔥 SELECT PARA ELEGIR EL ROL */}
              <div className="flex items-center space-x-3">
                <FiSettings className="text-purple-400 text-xl" />
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-purple-500 outline-none"
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 🔥 MODAL PARA VER LA MEMBRESÍA */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-105 relative">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center mb-6">
              <FiEye className="mr-2 text-blue-400" /> Detalles de la Membresía
            </h2>
            <div className="space-y-5 text-gray-300">
              <div className="flex items-center space-x-3">
                <FaUserCircle className="text-yellow-400 text-xl" />
                <p className="text-lg">
                  <span className="font-bold text-gray-100">Usuario: </span>
                  {selectedUser.username}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FiSearch className="text-blue-400 text-xl" />
                <p className="text-lg">
                  <span className="font-bold text-gray-100">Tipo: </span>
                  {selectedUser.membership?.membershipType?.name || "N/A"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FiPlusCircle className="text-green-400 text-xl" />
                <p className="text-lg">
                  <span className="font-bold text-gray-100">Inicio: </span>
                  {selectedUser.membership?.startDate
                    ? new Date(
                        selectedUser.membership.startDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FiPlusCircle className="text-red-400 text-xl" />
                <p className="text-lg">
                  <span className="font-bold text-gray-100">Fin: </span>
                  {selectedUser.membership?.endDate
                    ? new Date(
                        selectedUser.membership.endDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <span
                  className={`px-4 py-2 text-lg font-semibold rounded-lg shadow-md inline-block
              ${
                selectedUser.membership?.status === "Activa"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
                >
                  {selectedUser.membership?.status || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition transform hover:scale-105"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
