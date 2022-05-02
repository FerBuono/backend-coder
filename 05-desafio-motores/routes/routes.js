const { Router } = require("express");
const Products = require("../products");

const products = new Products();

const router = Router();

router.get('/', async(req, res) => {
    const productos = await products.getAll();
    res.render("productos", {productos});
});

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const product = await products.getById(id);
    if(product === undefined) {
        return res.json({error: "Producto no encontrado"});
    };
    res.json(product);
});

router.post('/', async(req, res) => {
    const newProduct = await products.addProduct(req.body);
    res.redirect('/');
});

router.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const product = await Products.getById(id);
    if(product === undefined) {
        return res.json({error: "Producto no encontrado"});
    };
    const productUpdated = await products.updateById(id, req.body)
    res.json(productUpdated);
});

router.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const product = await products.getById(id);
    if(product === undefined) {
        return res.json({error: "Producto no encontrado"});
    };
    res.json(await products.deleteById(id))
});

module.exports = router;