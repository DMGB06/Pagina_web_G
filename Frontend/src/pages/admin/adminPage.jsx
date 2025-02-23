import React, { useEffect, useState } from "react";
import { useMembershipType } from "../../context/membershiptypecontext";

function AdminPage() {
  const { getMshipsTypes, membershipType } = useMembershipType();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMshipsTypes(); // 🔥 Obtener datos de membresías
      } catch (error) {
        console.error("❌ Error al obtener membresías:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🔧 Panel de Administración</h1>
      <p className="text-gray-300 text-lg">Bienvenido al sistema de administración del gimnasio.</p>
      <p className="text-gray-300 text-lg">Membresías registradas: <span className="font-bold text-green-400">{membershipType.length}</span></p>
    </div>
  );
}

export default AdminPage;
