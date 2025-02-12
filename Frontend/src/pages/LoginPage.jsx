import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/contextoAutenticacion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, user, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/adminPage", { replace: true });
      } else if (user.role === "cliente") {
        navigate("/clientePage", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(gym-image3.jpg)" }}
    >
      {/* Contenedor del formulario con efecto vidrio translúcido */}
      <div className="flex items-center justify-end h-full pr-16">
        <div className="bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-2xl  w-96">
          <h2 className="text-white text-2xl font-bold text-left mb-4 text-center ">
            LOGIN
          </h2>

          {/* Botones de inicio con redes */}
          <div className="flex items-center space-x-12 justify-center mb-5">
            {[
              {
                src: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
                alt: "Google",
                hoverBg: "hover:bg-gray-300",
              },
              {
                src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
                alt: "Facebook",
                bg: "bg-blue-600",
                hoverBg: "hover:bg-blue-700",
              },
              {
                src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                alt: "Apple",
                hoverBg: "hover:bg-gray-300",
              },
            ].map((icon, index) => (
              <button
                key={index}
                className={`p-2 ${
                  icon.bg || "bg-white"
                } rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${
                  icon.hoverBg
                } flex items-center justify-center w-16 h-16 transform hover:scale-110`}
                aria-label={`Sign in with ${icon.alt}`}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-6 h-6 transition-transform duration-300 hover:scale-110"
                />
              </button>
            ))}
          </div>

          {/* 🔥 Errores de autenticación (Si existen) */}
          {signinErrors?.map((error, i) => (
            <div
              key={i}
              className="bg-red-500 p-2 mb-2 rounded-lg text-white text-center"
            >
              {error}
            </div>
          ))}
          
          {/* Formulario */}
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Enter your email address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white text-base font-semibold mb-1 drop-shadow-md">
                Enter your password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="w-full p-3 bg-white text-black placeholder-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end text-sm">
              <a href="#" className="text-white hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3 mt-4 rounded-md hover:bg-red-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
          </form>

          <p className="text-white text-center mt-4">
            No Account?{" "}
            <a href="/register" className="text-white hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
