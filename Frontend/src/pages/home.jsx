import React, { useEffect } from "react";
import { useMembershipType } from "../context/membershiptypecontext";

const Home = () => {
  const { membershipType, getMshipsTypes } = useMembershipType();

  useEffect(() => {
    getMshipsTypes();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Sección Hero - Imagen de Fondo */}
      <div className="relative h-[70vh] flex flex-col items-center justify-center text-center bg-cover bg-center" 
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?gym')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-5xl font-bold text-white drop-shadow-lg">
          Bienvenido a <span className="text-red-500">Brave Gym</span>
        </h1>
        <p className="relative text-lg mt-4 max-w-2xl text-gray-200">
          Mejora tu salud, construye fuerza y alcanza tus metas con nuestras membresías exclusivas.
        </p>
      </div>

      {/* 🔥 Sección de Membresías */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
          Nuestras Membresías
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {membershipType.map((membership) => (
            <div key={membership._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-white">{membership.name}</h3>
              <p className="text-gray-300 mt-2">Acceso exclusivo a entrenamientos premium.</p>
              <p className="text-red-500 text-3xl font-bold mt-4">${membership.price} / mes</p>
              <p className="text-gray-400 text-sm mt-2">Duración: {membership.duration} días</p>
              <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-bold transition-all">
                Adquirir Membresía
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
