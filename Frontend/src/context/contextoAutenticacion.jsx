import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);    
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
  
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
  
      // Evita que falle si error.response es undefined
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  /* UseEffect: Para eliminar los errores que se envian al backend*/
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
  
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
  
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return; // IMPORTANTE: Cortar la ejecución aquí xd
        }
  
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error verificando token:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors, loading}}
    >
      {children}
    </AuthContext.Provider>
  );
};
