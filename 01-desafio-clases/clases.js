class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    };

    addMascota(mascota) {
        this.mascotas.push(mascota);
    };

    countMascotas() {
        return this.mascotas.length;
    };

    addBook(autor, nombre) {
        this.libros.push({autor, nombre});
    };

    getBooksNames() {
        return this.libros.map(libro => libro.nombre);
    };
};

let user1 = new Usuario(
    'Fernando',
    'Buono',
    [{autor: 'Isaac Asimov', nombre: 'Foundation'},{autor: 'Cristophe Galfard', nombre: 'El universo en tu mano'}],
    ['perro', 'gato']
);

console.log(user1);
user1.addBook('Ray Bradbury', 'Crónicas marcianas');
user1.addMascota('pajaro');
console.log(user1.countMascotas());
console.log(user1.getBooksNames());
console.log(user1.getFullName());