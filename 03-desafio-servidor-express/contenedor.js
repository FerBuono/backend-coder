const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    };

    async save(title, price, thumbnail) {
        const product = {
            title,
            price,
            thumbnail,
        };

        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(content);

            const products = [...array, product];
            products[products.length - 1].id = products.length;

            await fs.promises.writeFile(this.file, JSON.stringify(products));
        } catch (error) {
            console.log(error)
        };
    };

    async getById(id) {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(content);

            console.log(array.find(product => product.id === id) || null)
        } catch (error) {
            console.log(error)
        };
    };

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');

            return JSON.parse(content);
        } catch (error) {
            console.log(error);
        };
    };

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            const array = JSON.parse(content);

            const updated = array.filter(product => product.id !== id);

            await fs.promises.writeFile(this.file, JSON.stringify(updated));
        } catch (error) {
            console.log(error);
        };
    };

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, '[]');
        } catch (error) {
            console.log(error);
        };
    };
};

module.exports = Contenedor;