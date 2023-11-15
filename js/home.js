// Función para pintar productos en un contenedor
const pintarProductos = (data) => {
    // Obtener el contenedor donde se mostrarán los productos
    const contenedor = document.getElementById("producto-contenedor");

    // Iterar sobre cada producto en los datos proporcionados
    data.forEach(producto => {
        // Crear un nuevo elemento div para representar la tarjeta del producto
        const div = document.createElement('div');
        
        // Agregar la clase 'card' al div recién creado
        div.classList.add('card');

        // Agregar el contenido HTML al div
        div.innerHTML += `
            <div class="card-image">
                <img src=${producto.imagen}>
                <span class="card-title">${producto.nombre}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red">
                    <i id=${producto.id} class="material-icons agregar">add_shopping_cart</i>
                </a>
            </div>
            <div class="card-content">
                <p>${producto.desc}</p>
                <p>${producto.precio}</p>
            </div>
        `;

        // Agregar el div al contenedor principal
        contenedor.appendChild(div);
    });
};