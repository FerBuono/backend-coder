class Products {
    constructor() {
        this.list = [];
    };

    async getAll() {
        try {
            return this.list;
        } catch (error) {
            console.log(error);
        };
    };

    async getById(id) {
        try {
            return this.list.find(product => product.id === id);
        } catch (error) {
            console.log(error)
        };
    };

    async addProduct(item) {
        const product = {
            ...item,
            id: this.list.length + 1
        };

        try {
            this.list.push(product);
            return product;
        } catch (error) {
            console.log(error)
        };
    };

    async updateById(id, item) {
        const product = this.list.find(product => product.id === id);
        try {
            product.title = item.title;
            product.price = item.price;
            product.thumbnail = item.thumbnail;
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            return this.list.filter(product => product.id !== id)
        } catch (error) {
            console.log(error);
        };
    };
};

module.exports = Products;