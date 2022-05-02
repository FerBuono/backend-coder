const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const Messages = require('./controllers/messages');
const Container = require('./controllers/products');

// APIs
const products = new Container('./06-desafio-websockets/db/products.txt');
const messages = new Messages('./06-desafio-websockets/db/messages.txt')

// Directorio público
app.use(express.static('./06-desafio-websockets/public'));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Websockects
io.on('connection', async(socket) => {
    console.log('Nuevo usuario conectado');

    socket.emit('products', await products.getAll());

    socket.on('new-product', async(data) => {
        await products.save(data);
        io.sockets.emit('products', await products.getAll());
    });

    socket.emit('messages', await messages.getAll());

    socket.on('new-message', async(data) => {
        await messages.save(data.user, data.message);
        io.sockets.emit('messages', await messages.getAll());
    });
});


// Server
const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${PORT}`);
});
server.on('error', (err) => console.log(`Error: ${err}`));