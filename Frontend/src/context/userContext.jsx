import { createContext, useContext, useState, useEffect } from "react";
import {
  createUser as createUserAPI,
  getUser as getUserAPI,
  getUsers as getUsersAPI,
  deleteUser as deleteUserAPI,
  updateUser as updateUserAPI,
} from "../api/user";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  // 🔍 Obtener todos los usuarios y actualizar estado
  const getUsersContext = async () => {
    try {
      const res = await getUsersAPI();
      console.log(res.data)
      setUsers(res.data);
    } catch (error) {
      console.error("❌ Error al obtener los usuarios:", error);
    }
  };

  // 🔍 Obtener un solo usuario por ID
  const getUserContext = async (id) => {
    try {
      const res = await getUserAPI(id);
      return res.data;
    } catch (error) {
      console.error("❌ Error al obtener el usuario:", error);
    }
  };

  // ➕ Crear un nuevo usuario y actualizar estado
  const createUserContext = async (data) => {
    try {
      const res = await createUserAPI(data);
      if (res.status === 201) {
        setUsers([...users, res.data]); // Agregar nuevo usuario al estado
      }
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
  
      // ✅ Capturar errores y establecer en el estado para que el frontend los muestre
      if (error.response && error.response.data) {
        setErrors([error.response.data]); // Asegurar que el backend envíe un mensaje correcto
      } else {
        setErrors(["Hubo un error al crear el usuario. Intenta nuevamente."]);
      }
    }
  };

  // ✏️ Actualizar usuario y actualizar estado
  const updateUserContext = async (id, data) => {
    try {
      console.log("🔄 Actualizando usuario:", { id, ...data });

      await updateUserAPI(id, {
        username: data.username.trim(),
        email: data.email,
        password: data.password,
      });

      setUsers(users.map(user => (user._id === id ? { ...user, ...data } : user)));
    } catch (error) {
      console.error("❌ Error actualizando usuario:", error);
    }
  };

  // 🗑️ Eliminar usuario y actualizar estado
  const deleteUserContext = async (id) => {
    try {
      const res = await deleteUserAPI(id);
      if (res.status === 200) {
        setUsers(users.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);  


  return (
    <UserContext.Provider
      value={{
        users,
        getUsersContext,
        getUserContext,
        deleteUserContext,
        updateUserContext,
        createUserContext,
        errors
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
