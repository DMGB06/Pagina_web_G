import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Links de Navegación */}
        <ul className="flex space-x-6 text-white font-semibold uppercase">
          {[
            { name: "Home", path: "/Home" },
            { name: "Contact Us", path: "/contactUs" },
            { name: "Login", path: "/login" },
            { name: "Sign Up", path: "/register" }
          ].map((link, index) => (
            <li key={index} className="relative group cursor-pointer">
              <Link
                to={link.path}
                className="hover:text-red-500 transition duration-300"
              >
                {link.name}
              </Link>
              {/* 🔥 Efecto de subrayado que crece en hover */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
