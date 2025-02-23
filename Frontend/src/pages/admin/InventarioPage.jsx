import React, { useState } from "react";
import { FiEdit, FiTrash, FiPlusCircle, FiSearch } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";

const ProductsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Productos estáticos con imágenes, stock y precios reales
  const products = [
    { id: 1, name: "Proteína Whey", price: 120, stock: 5, category: "Suplementos", image: "https://source.unsplash.com/300x300/?protein" },
    { id: 2, name: "Creatina Monohidratada", price: 80, stock: 20, category: "Suplementos", image: "https://source.unsplash.com/300x300/?creatine" },
    { id: 3, name: "Mancuernas 10kg", price: 250, stock: 2, category: "Equipamiento", image: "https://source.unsplash.com/300x300/?dumbbell" },
    { id: 4, name: "Cinturón para Levantamiento", price: 150, stock: 10, category: "Accesorios", image: "https://source.unsplash.com/300x300/?belt" },
  ];

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter((product) =>
    (selectedCategory === "all" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-w-screen min-h-screen bg-cover flex flex-col items-center justify-center bg-gray-200 text-white p-8"
    >
      <div className="bg-gray-800 bg-opacity-95 shadow-xl rounded-lg p-8 w-full max-w-5xl border border-gray-700">
        {/* 🔥 Encabezado y Botón Crear */}
        <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-6">
          <h2 className="text-4xl font-semibold text-gray-200 flex items-center tracking-wider uppercase">
            📦 Gestión de Productos
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105 shadow-lg font-semibold"
          >
            <FiPlusCircle className="mr-2 text-xl" /> Nuevo Producto
          </button>
        </div>

        {/* 🔍 Barra de Búsqueda y Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none transition font-medium"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none transition font-medium"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            <option value="Suplementos">Suplementos</option>
            <option value="Equipamiento">Equipamiento</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>

        {/* 🛒 Lista de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-400 text-center col-span-4 text-lg font-semibold">
              ❌ No se encontraron productos.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition transform hover:scale-105 flex flex-col items-center border border-gray-700 hover:border-yellow-500 hover:shadow-2xl"
              >
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-500 hover:border-yellow-500 transition">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-36 h-36 object-cover rounded-lg shadow-md border border-gray-500 bg-white p-2"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-center text-gray-100 uppercase tracking-wide mt-3">
                  {product.name}
                </h3>

                <span className="text-lg font-bold text-yellow-500 mt-2">
                  S/{product.price}
                </span>

                {/* 📦 Stock Disponible */}
                <div className="mt-2 text-sm font-medium text-gray-300">
                  Stock disponible: <span className="font-bold text-white">{product.stock}</span>
                </div>

                {/* 🔘 Botones de Acción */}
                <div className="flex items-center space-x-3 mt-4">
                  <button className="text-blue-400 hover:text-blue-300 transition p-2 bg-gray-800 rounded-md hover:shadow-md border border-gray-700 hover:border-blue-400">
                    <FiEdit size={20} />
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition p-2 bg-gray-800 rounded-md hover:shadow-md border border-gray-700 hover:border-red-400">
                    <FiTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Confirmación para Eliminar */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-100 text-center mb-4">¿Eliminar este producto?</h2>
            <p className="text-gray-300 text-center">{selectedProduct?.name}</p>
            <div className="flex justify-around mt-6">
              <button onClick={() => setShowConfirm(false)} className="bg-red-500 px-5 py-2 rounded-md text-white font-bold hover:bg-red-400 transition">
                Sí, eliminar
              </button>
              <button onClick={() => setShowConfirm(false)} className="bg-gray-600 px-5 py-2 rounded-md text-white font-bold hover:bg-gray-500 transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Creación */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-96 transform transition-all scale-105">
            <h2 className="text-xl font-bold text-white text-center mb-4">➕ Crear Nuevo Producto</h2>
            <input type="text" name="name" className="w-full p-3 mb-3 bg-gray-800 text-white rounded-md" placeholder="Nombre" />
            <input type="number" name="price" className="w-full p-3 mb-3 bg-gray-800 text-white rounded-md" placeholder="Precio (S/)" />
            <input type="number" name="stock" className="w-full p-3 mb-3 bg-gray-800 text-white rounded-md" placeholder="Stock Disponible" />
            <div className="flex justify-between mt-4">
              <button className="w-1/2 bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-400 transition">
                ✅ Crear
              </button>
              <button onClick={() => setShowCreateModal(false)} className="w-1/2 bg-gray-700 text-white font-bold py-3 rounded-md hover:bg-gray-600 transition">
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
