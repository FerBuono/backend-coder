const express = require('express');

// Servidor express
const app = express();

// Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./desafio-motores/views");

// Directorio público
app.use(express.static('./desafio-motores/public'));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use('/api/productos', require('./routes/routes'));

// Escuchar peticiones
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Este es el error: ${error}`));