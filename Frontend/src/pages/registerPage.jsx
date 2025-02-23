import React, { useEffect } from "react";
import { useForm } from "react-hook-form"; // Corrección aquí, es para el manejo de errores
import { registerRequest } from "../api/auth";
import { useAuth } from "../context/contextoAutenticacion";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Inicializamos correctamente los elementos que se usaran

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(gym-image3.jpg)" }}
    >
      {/* Formulario de Registro */}
      <div className="flex items-center justify-end h-full pr-16">
        <div className="bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl  w-96">
          <h2 className="text-white text-2xl font-bold text-left mb-4 text-center">
            SIGN UP
          </h2>{" "}
          {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 mb-2 rounded-lg" key={i}>
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Enter your email address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                autoComplete="email"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 mt-1 font-semibold">{errors.email.message}</p>
              )}
            </div>

              {/* User Name Input */}
              <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">User Name</label>
              <input
                type="text"
                {...register("username", { required: true })}
                placeholder="User Name"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.username && (
                <p className="text-red-500 mb-2 font-semibold">User name is required</p>
              )}
              </div>
              {/* Password Input */}

              <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Enter your password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-600 mt-1 font-semibold">{errors.password.message}</p>
              )}
            </div>

              {/* Sign in Link */}
              <p className="flex justify-end text-sm text-white">
                Have an Account?{""}

                <a href="/login" className="text-white hover:underline">
                  Login
                </a>
              </p>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3 mt-4 rounded-md hover:bg-red-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Sign up
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
