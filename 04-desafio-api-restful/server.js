const express = require('express');
const Products = require('./products');

const products = new Products();

const app = express();
const routerProductos = express.Router();

app.use('/api/productos', routerProductos);

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.static('./desafio-api-restful/public'));

routerProductos.get('/', async(req, res) => {
    res.json(await products.getAll());
});

routerProductos.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const product = await products.getById(id);
    if(product === undefined) {
        return res.json({error: "Producto no encontrado"});
    };
    res.json(product);
});

routerProductos.post('/', async(req, res) => {
    const newProduct = await products.addProduct(req.body);
    res.json(newProduct);
});

routerProductos.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const product = await products.getById(id);
    if(product === undefined) {
        return res.json({error: "Producto no encontrado"});
    };
    const productUpdated = await products.updateById(id, req.body)
    res.json(productUpdated);
});

routerProductos.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const product = await products.getById(id);
    if(product === undefined) {
        return res.json({error: "Producto no encontrado"});
    };
    res.json(await products.deleteById(id))
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Este es el error: ${error}`));