// Definimos las categorías y productos
const categorias = {
    "Anillos": ["Anillo de Oro", "Anillo de Plata", "Anillo de Diamantes"],
    "Collares": ["Collar de Oro", "Collar de Perlas", "Collar de Esmeraldas"],
    "Pulseras": ["Pulsera de Oro", "Pulsera de Plata", "Pulsera de Rubíes"],
    "Pendientes": ["Pendientes de Oro", "Pendientes de Plata", "Pendientes de Diamantes"]
};

// Función para mostrar el menú principal
function mostrarMenuPrincipal() {
    let menu = "Bienvenido a la tienda de joyería\n";
    menu += "Seleccione una categoría:\n";
    let categoriasArray = Object.keys(categorias);
    for (let i = 0; i < categoriasArray.length; i++) {
        menu += `${i + 1}. ${categoriasArray[i]}\n`;
    }
    menu += `${categoriasArray.length + 1}. Salir\n`;
    return menu;
}

// Función para mostrar los productos de una categoría
function mostrarProductos(categoria) {
    let productos = "Seleccione un producto:\n";
    let productosArray = categorias[categoria];
    for (let i = 0; i < productosArray.length; i++) {
        productos += `${i + 1}. ${productosArray[i]}\n`;
    }
    productos += `${productosArray.length + 1}. Volver al menú principal\n`;
    return productos;
}

// Variable para llevar la cuenta del carrito de compras
let carrito = [];

// Bucle principal de la aplicación
while (true) {
    let menuPrincipal = mostrarMenuPrincipal();
    let seleccionCategoria = prompt(menuPrincipal);
    let categoriasArray = Object.keys(categorias);

    // Verificamos si el usuario quiere salir
    if (seleccionCategoria == categoriasArray.length + 1) {
        break;
    }

    // Convertimos la selección a un índice
    let indiceCategoria = parseInt(seleccionCategoria) - 1;

    // Verificamos si la selección es válida
    if (indiceCategoria >= 0 && indiceCategoria < categoriasArray.length) {
        let categoriaSeleccionada = categoriasArray[indiceCategoria];
        let menuProductos = mostrarProductos(categoriaSeleccionada);

        while (true) {
            let seleccionProducto = prompt(menuProductos);
            let productosArray = categorias[categoriaSeleccionada];

            // Verificamos si el usuario quiere volver al menú principal
            if (seleccionProducto == productosArray.length + 1) {
                break;
            }

            // Convertimos la selección a un índice
            let indiceProducto = parseInt(seleccionProducto) - 1;

            // Verificamos si la selección es válida
            if (indiceProducto >= 0 && indiceProducto < productosArray.length) {
                let productoSeleccionado = productosArray[indiceProducto];
                carrito.push(productoSeleccionado);
                alert(`Has añadido ${productoSeleccionado} a tu carrito.`);
            } else {
                alert("Selección inválida. Intente de nuevo.");
            }
        }
    } else {
        alert("Selección inválida. Intente de nuevo.");
    }
}

// Mostramos el contenido final del carrito
if (carrito.length > 0) {
    let resumenCarrito = "Tu carrito de compras contiene:\n";
    for (let i = 0; i < carrito.length; i++) {
        resumenCarrito += `${i + 1}. ${carrito[i]}\n`;
    }
    alert(resumenCarrito);
} else {
    alert("Tu carrito está vacío.");
}

alert("Gracias por visitar nuestra tienda de joyería.");
