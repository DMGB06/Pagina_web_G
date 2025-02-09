require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

// import routes
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js")

app.use(cookieParser()); // Necesario para leer las cookies
app.use(express.json()); // Necesario para recibir JSON en las peticiones
app.use("/api", authRoutes); // Ahora Express sabe que existen estas rutas
app.use("/api", userRoutes);

/*-- Connection Database -- */
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("🔥 Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error de conexión:", error));

// --  Run server --
app.listen(port, () => console.log(`🔥 Servidor corriendo en http://localhost:${port}`));
