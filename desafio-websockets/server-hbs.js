const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const handlebars = require('express-handlebars');

// Motor de plantillas
app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: "./desafio-websockets/views/layouts"
}));

app.set("view engine", "hbs");
app.set("views", "./desafio-websockets/views");

// Directorio público
app.use(express.static('./desafio-websockets/public'));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use('/api/productos', require('./routes/routes'));

// Escuchar peticiones
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Este es el error: ${error}`));