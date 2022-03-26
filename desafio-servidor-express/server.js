// Express
const express = require('express');
const app = express();

// Contenedor de productos
const Contenedor = require('./contenedor');
const prods = new Contenedor('./productos.txt');

// Rutas
app.get('/', (req, res) => {
    res.send('<h1 style="color:green;">Este es el 3er desafío</h1>');
});

app.get('/productos', async(req, res) => {
    res.send(await prods.getAll());
});

app.get('/productoRandom', async(req, res) => {
    const all = await prods.getAll();
    const numRand = Math.round(Math.random() * (all.length - 1));
    res.send(all[numRand]);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Este es el error: ${error}`));