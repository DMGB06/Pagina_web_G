const express = require ('express');
const mongoose = require ('mongoose');
require("dotenv").config();

const app = express();
const port = process.env.PORT || "3000";

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connect to mongodb atlas'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor corriendo en el puerto: ', port))
