const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const Container = require('./controllers/products');
const Messages = require('./controllers/messages');

const { options: mariaDBOptions } = require('./options/mariaDB');
const { options: sqLite3Options } = require('./options/SQLite3');

// APIs
const products = new Container(mariaDBOptions, 'products');
products.dropTable();
products.createTable();

const messages = new Messages(sqLite3Options, 'messages');
messages.dropTable();
messages.createTable();

// Directorio público
app.use(express.static('./07-desafio-bdd/public'));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Websockects
io.on('connection', async(socket) => {
    console.log('Nuevo usuario conectado');

    socket.emit('products', await products.getAll());

    socket.on('new-product', async(data) => {
        products.save(data);
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