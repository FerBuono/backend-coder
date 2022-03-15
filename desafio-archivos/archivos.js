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
            products.forEach((product, index) => product.id = (index + 1));

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

            console.log(JSON.parse(content));
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

const cont = new Contenedor('./desafio-archivos/products.txt');

cont.save('Sapiens', '$30', 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Sapiens-uma-breve-historia-da-humanidade-livro-yuval-harari-320001-MLB20265211115_032015-O.jpg');
// [{"title":"Sapiens","price":"$30","thumbnail":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Sapiens-uma-breve-historia-da-humanidade-livro-yuval-harari-320001-MLB20265211115_032015-O.jpg","id":1}]

cont.save('Homo Deus', '$30', 'https://images-na.ssl-images-amazon.com/images/I/71E+pflcJrL.jpg');
// [{"title":"Sapiens","price":"$30","thumbnail":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Sapiens-uma-breve-historia-da-humanidade-livro-yuval-harari-320001-MLB20265211115_032015-O.jpg","id":1},{"title":"Homo Deus","price":"$30","thumbnail":"https://images-na.ssl-images-amazon.com/images/I/71E+pflcJrL.jpg","id":2}]

cont.save('Guía del autoestopista galáctico', '$20', 'https://www.anagrama-ed.es/uploads/media/portadas/0001/24/78b2f976a71ca60a397892128ee691677b4cb2a1.jpeg');
// [{"title":"Sapiens","price":"$30","thumbnail":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Sapiens-uma-breve-historia-da-humanidade-livro-yuval-harari-320001-MLB20265211115_032015-O.jpg","id":1},{"title":"Homo Deus","price":"$30","thumbnail":"https://images-na.ssl-images-amazon.com/images/I/71E+pflcJrL.jpg","id":2},{"title":"Guía del autoestopista galáctico","price":"$20","thumbnail":"https://www.anagrama-ed.es/uploads/media/portadas/0001/24/78b2f976a71ca60a397892128ee691677b4cb2a1.jpeg","id":3}]

cont.getById(1);
/*
{
  title: 'Sapiens',
  price: '$30',
  thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Sapiens-uma-breve-historia-da-humanidade-livro-yuval-harari-320001-MLB20265211115_032015-O.jpg',   
  id: 1
}
*/

cont.getAll();
/*
[
  {
    title: 'Sapiens',
    price: '$30',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Sapiens-uma-breve-historia-da-humanidade-livro-yuval-harari-320001-MLB20265211115_032015-O.jpg', 
    id: 1
  },
  {
    title: 'Homo Deus',
    price: '$30',
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/71E+pflcJrL.jpg',
    id: 2
  },
  {
    title: 'Guía del autoestopista galáctico',
    price: '$20',
    thumbnail: 'https://www.anagrama-ed.es/uploads/media/portadas/0001/24/78b2f976a71ca60a397892128ee691677b4cb2a1.jpeg',
    id: 3
  }
]
*/

cont.deleteById(1);
// [{"title":"Homo Deus","price":"$30","thumbnail":"https://images-na.ssl-images-amazon.com/images/I/71E+pflcJrL.jpg","id":2},{"title":"Guía del autoestopista galáctico","price":"$20","thumbnail":"https://www.anagrama-ed.es/uploads/media/portadas/0001/24/78b2f976a71ca60a397892128ee691677b4cb2a1.jpeg","id":3}]

cont.deleteAll();
// []