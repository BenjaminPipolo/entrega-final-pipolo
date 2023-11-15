// Obtener referencias a elementos del DOM relacionados con el carrito y el modal
const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');

// Abrir el modal del carrito al hacer clic en el botón correspondiente
abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
});

// Cerrar el modal del carrito al hacer clic en el botón de cerrar
cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
});

// Cerrar el modal del carrito al hacer clic en cualquier parte fuera del modal
modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click();
});

// Event delegation en el modal del carrito para manejar clics en elementos hijos
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al contenedor modal

    // Verificar si el elemento clicado es un botón de eliminar producto
    if (e.target.classList.contains('boton-eliminar')) {
        // Llamar a la función eliminarProductoCarrito con el valor del botón
        eliminarProductoCarrito(e.target.value);
    }
});