const socket = io.connect();

// Productos
const productsForm = document.getElementById('products-form');

productsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = e.target.title.value;
    const price = e.target.price.value;
    const thumbnail = e.target.thumbnail.value;

    socket.emit('new-product', {title, price, thumbnail});

    productsForm.reset();
});

const generateProductsTable = async(productos) => {
    const res = await fetch('./views/products.ejs');
    const view = await res.text();
    console.log(view);
    const html = ejs.render(view, {productos: productos});
    return html;
};

socket.on('products', (productos) => {
    generateProductsTable(productos)
        .then(html => {
            document.getElementById('products-container').innerHTML = html;
        });
});


// Mensajes
const messagesForm = document.getElementById('messages-form');
const messagesBox = document.getElementById('messages');

messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = e.target.user.value;
    const message = e.target.message.value;

    socket.emit('new-message', {user, message});

    e.target.message.value = '';
});

socket.on('messages', (mensajes) => {
    if(mensajes.length > 0) {
        const mensajesHTML = mensajes
            .map(msj => `
                <p style="font-size: 13px">
                    <b style="color: blue">${msj?.user}</b> [<n style="color: brown">${msj?.time}</n>]: <i style="color: green">${msj.message}</i>
                </p>`)
            .join('');
        messagesBox.innerHTML = mensajesHTML;
    };

    messagesBox.scrollTop = 10000;
});