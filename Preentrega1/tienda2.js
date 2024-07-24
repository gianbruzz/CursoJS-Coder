// Definimos las categorías y productos
const categorias = {
  Anillos: ["Anillo de Oro", "Anillo de Plata", "Anillo de Diamantes"],
  Collares: ["Collar de Oro", "Collar de Perlas", "Collar de Esmeraldas"],
  Pulseras: ["Pulsera de Oro", "Pulsera de Plata", "Pulsera de Rubíes"],
  Pendientes: [
    "Pendientes de Oro",
    "Pendientes de Plata",
    "Pendientes de Diamantes",
  ],
};

// Función para mostrar el menú principal (usando función flecha)
const mostrarMenuPrincipal = () => {
  let menu = "¡Bienvenido a nuestra tienda!\n";
  menu += "Seleccione una categoría:\n";
  let categoriasArray = Object.keys(categorias);
  for (let i = 0; i < categoriasArray.length; i++) {
    menu += `${i + 1}. ${categoriasArray[i]}\n`;
  }
  menu += `${categoriasArray.length + 1}. Salir\n`;
  return menu;
};

// Función para mostrar los productos de una categoría (usando función flecha)
const mostrarProductos = (categoria) => {
  let productos = "Seleccione un producto:\n";
  let productosArray = categorias[categoria];
  for (let i = 0; i < productosArray.length; i++) {
    productos += `${i + 1}. ${productosArray[i]}\n`;
  }
  productos += `${productosArray.length + 1}. Volver al menú principal\n`;
  return productos;
};

// Función para manejar la selección de categoría y productos
const manejarSeleccion = () => {
  // Variable para llevar la cuenta del carrito de compras
  let carrito = [];

  // Bucle principal de la aplicación
  while (true) {
    let menuPrincipal = mostrarMenuPrincipal();
    let seleccionCategoria = prompt(menuPrincipal);

    // Verificamos si el usuario canceló el prompt
    if (seleccionCategoria === null) {
      // alert("Entendemos que no querés realizar ninguna compra.");
      break;
    }

    let categoriasArray = Object.keys(categorias);

    // Verificamos si el usuario quiere salir
    if (parseInt(seleccionCategoria) == categoriasArray.length + 1) {
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

        // Verificamos si el usuario canceló el prompt
        if (seleccionProducto === null) {
          break;
        }

        let productosArray = categorias[categoriaSeleccionada];

        // Verificamos si el usuario quiere volver al menú principal
        if (parseInt(seleccionProducto) == productosArray.length + 1) {
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
    // resumenCarrito += `Desea finalizar su compra?`
    // prompt(resumenCarrito);
    alert(resumenCarrito);
    // Preguntamos si desea finalizar la compra
    let finalizarCompra = confirm("¿Deseas finalizar la compra?");
    if (finalizarCompra) {
      let nombre = prompt("Ingresa tu nombre:");
      if (nombre !== null) {
        let direccion = prompt("Ingresa tu dirección:");
        if (direccion !== null) {
          alert(
            `Gracias por tu compra, ${nombre}. Tus productos serán enviados a ${direccion}.`
          );
        } else {
          alert("Compra cancelada. No se ingresó la dirección.");
        }
      } else {
        alert("Compra cancelada. No se ingresó el nombre.");
      }
    } else {
      alert("Compra cancelada. No se finalizó la compra.");
    }
  } else {
    alert("Tu carrito está vacío.");
  }

  alert("Gracias por visitar nuestra tienda de joyería.");
};

// Ejecutamos la función principal
manejarSeleccion();
