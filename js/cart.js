// Declaración de un array que representa el carrito de compras
let carrito = [];

// Elemento del DOM que contiene los productos
const productoContenedor = document.getElementById('producto-contenedor');

// Event delegation - delegación de eventos
productoContenedor.addEventListener('click', (e) => {
    // Verifica si el elemento clickeado tiene la clase 'agregar'
    if (e.target.classList.contains('agregar')) {
        // Llama a la función para validar y gestionar el producto en el carrito
        validarProductoCarrito(e.target.id);
    }
});

// Función para validar y gestionar productos en el carrito
const validarProductoCarrito = (productoId) => {
    // Verifica si el producto ya está en el carrito
    const estaRepetido = carrito.some(producto => producto.id == productoId);

    if (!estaRepetido) {
        // Si el producto no está en el carrito, lo agrega
        const producto = productos.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        actualizarTotalesCarrito(carrito);
    } else {
        // Si el producto ya está en el carrito, incrementa la cantidad
        const producto = carrito.find(producto => producto.id == productoId);
        const cantidad = document.getElementById(`cantidad${producto.id}`);
        producto.cantidad++
        cantidad.innerText = `Cantidad: ${producto.cantidad}`;
        actualizarTotalesCarrito(carrito);
    }
};

// Función para pintar un producto en el carrito
const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `;
    contenedor.appendChild(div);
};

// Función para actualizar los totales del carrito
const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

// Función para pintar los totales del carrito en el DOM
const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

// Función para pintar todos los productos en el carrito
const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `;
        contenedor.appendChild(div);
    });
};

// Función para eliminar un producto del carrito
function eliminarProductoCarrito(productoId) {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
}

// Función para guardar el carrito en el almacenamiento local
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para obtener el carrito desde el almacenamiento local
const obtenerCarritoStorage = () => {
    return JSON.parse(localStorage.getItem('carrito'));
};

// Evento al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    // Evento click para el botón "Vaciar Carrito"
    document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);

    // Función para vaciar el carrito
    function vaciarCarrito() {
        // Verifica si el carrito está vacío
        if (carrito.length === 0) {
            // Muestra un mensaje si el carrito está vacío
            Swal.fire({
                icon: 'info',
                title: 'Su carrito ya se encuentra vacío',
            });
        } else {
            // Elimina los productos del carrito
            carrito = [];

            // Elimina los productos del Storage
            localStorage.removeItem('carrito');

            // Muestra un mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Los productos han sido eliminados con éxito!',
            });

            // Actualiza la interfaz del carrito
            pintarCarrito(carrito);
            actualizarTotalesCarrito(carrito);
        }
    }

    // Llama a cargarCarrito al cargar la página para restaurar el carrito desde el almacenamiento local
    cargarCarrito();
});

// Función para cargar el carrito al iniciar la página
const cargarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
};