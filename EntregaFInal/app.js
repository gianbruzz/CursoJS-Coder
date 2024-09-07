class Tienda {
    constructor() {
        this.productos = {};  
        this.carrito = [];
        this.total = 0;
        this.mostrarMensajeCarritoVacio = false;
        this.init();
    }

    async init() {
        await this.cargarProductos();  
        this.cargarCarrito();
        this.mostrarMenuPrincipal();
    }

    async cargarProductos() {
        try {
            const response = await fetch('products.json');  
            const data = await response.json();
            this.organizarProductosPorCategoria(data.productos);  
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    }

    organizarProductosPorCategoria(productos) {
        this.productos = productos.reduce((categorias, producto) => {
            const { categoria, nombre, precio, moneda, imagen, stock } = producto;
            if (!categorias[categoria]) {
                categorias[categoria] = [];
            }
            categorias[categoria].push({ nombre, precio, moneda, imagen, stock });
            return categorias;
        }, {});
    }

    mostrarMensaje(mensaje, tipo = "info") {
        Swal.fire({
            title: tipo.charAt(0).toUpperCase() + tipo.slice(1),
            text: mensaje,
            icon: tipo,
            confirmButtonText: 'Aceptar'
        });
    }


    mostrarMenuPrincipal() {
        const menuPrincipalDiv = document.getElementById("menu-principal");
        menuPrincipalDiv.innerHTML = "<h2>Seleccione una categoría:</h2>";

        const categoriasArray = Object.keys(this.productos);
        categoriasArray.forEach((categoria, index) => {
            const boton = document.createElement("button");
            boton.textContent = `${index + 1}. ${categoria}`;
            boton.className = "btn btn-primary btn-full-width mb-2";
            boton.onclick = () => this.mostrarProductos(categoria);
            menuPrincipalDiv.appendChild(boton);
        });

        const salirBtn = document.createElement("button");
        salirBtn.textContent = `${categoriasArray.length + 1}. Salir`;
        salirBtn.className = "btn btn-danger btn-full-width";
        salirBtn.onclick = () => this.salir();
        menuPrincipalDiv.appendChild(salirBtn);

        this.mostrarCarrito();
    }

    mostrarProductos(categoria) {
        const productosDiv = document.getElementById("productos");
        productosDiv.innerHTML = `<h2>${categoria}</h2><p>Seleccione un producto:</p>`;

        const productosArray = this.productos[categoria];
        productosArray.forEach((producto, index) => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "producto-item";

            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.className = "producto-imagen";

            const texto = document.createElement("span");
            texto.textContent = `${producto.nombre} - $${producto.precio} ${producto.moneda}`;

            const cantidadInput = document.createElement("input");
            cantidadInput.type = "number";
            cantidadInput.min = "1";
            cantidadInput.max = producto.stock;
            cantidadInput.value = "1";
            cantidadInput.id = `cantidad-${index}`;
            cantidadInput.className = "form-control w-25 mr-2";

            const boton = document.createElement("button");
            boton.textContent = "Agregar al carrito";
            boton.className = "btn btn-outline-secondary";
            boton.onclick = () => this.agregarAlCarrito(producto, parseInt(cantidadInput.value));

            productoDiv.appendChild(img);
            productoDiv.appendChild(texto);
            productoDiv.appendChild(cantidadInput);
            productoDiv.appendChild(boton);
            productosDiv.appendChild(productoDiv);
        });

        const volverBtn = document.createElement("button");
        volverBtn.textContent = "Volver al menú principal";
        volverBtn.className = "btn btn-warning btn-full-width mt-3";
        volverBtn.onclick = () => this.volverAlMenuPrincipal();
        productosDiv.appendChild(volverBtn);
    }

    agregarAlCarrito(producto, cantidad) {
        if (cantidad > producto.stock) {
            this.mostrarMensaje("La cantidad excede el stock disponible.", "error");
            return;
        }

        const productoEnCarrito = this.carrito.find(p => p.nombre === producto.nombre);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            this.carrito.push({ ...producto, cantidad });
        }
        
        producto.stock -= cantidad;  // Descontar del stock
        this.total += producto.precio * cantidad;  // Sumar al total
        this.guardarCarrito();
        this.mostrarMensaje(`Has añadido (${cantidad}) ${producto.nombre} a tu carrito.`, "success");
        this.mostrarCarrito();
    }

    volverAlMenuPrincipal() {
        const productosDiv = document.getElementById("productos");
        productosDiv.innerHTML = "";
        const formularioCompraDiv = document.getElementById("formulario-compra");
        formularioCompraDiv.innerHTML = "";
        this.mostrarMenuPrincipal();
    }

    mostrarCarrito() {
        const carritoDiv = document.getElementById("carrito");
        carritoDiv.innerHTML = "<h2>Tu carrito de compras:</h2>";

        if (this.carrito.length > 0) {
            this.carrito.forEach((producto, index) => {
                const item = document.createElement("div");
                item.className = "carrito-item";
                item.innerHTML = `
                    <p>${producto.nombre} - $${producto.precio} USD - Cantidad: ${producto.cantidad}</p>
                    
                `;
                carritoDiv.appendChild(item);
            });

            // Mostrar el total del carrito
            const totalDiv = document.createElement("p");
            totalDiv.className = "total";
            totalDiv.textContent = `Total: $${this.total} USD`;
            carritoDiv.appendChild(totalDiv);

            const finalizarBtn = document.createElement("button");
            finalizarBtn.textContent = "Finalizar compra";
            finalizarBtn.className = "btn btn-success btn-full-width mt-3";
            finalizarBtn.onclick = () => this.mostrarFormularioCompra();
            carritoDiv.appendChild(finalizarBtn);

            const vaciarBtn = document.createElement("button");
            vaciarBtn.textContent = "Vaciar carrito";
            vaciarBtn.className = "btn btn-danger btn-full-width mt-2";
            vaciarBtn.onclick = () => this.vaciarCarrito();
            carritoDiv.appendChild(vaciarBtn);
        } else {
            carritoDiv.innerHTML = "<p>Tu carrito está vacío.</p>";
        }
    }

    // eliminarDelCarrito(index) {
    //     const producto = this.carrito[index];
    //     if (producto) {
    //         // Volver a agregar la cantidad al stock
    //         this.productos[producto.categoria] = this.productos[producto.categoria].map(p => {
    //             if (p.nombre === producto.nombre) {
    //                 p.stock += producto.cantidad;
    //             }
    //             return p;
    //         });

    //         // Eliminar el producto del carrito
    //         this.carrito.splice(index, 1);
    //         this.total -= producto.precio * producto.cantidad;
    //         this.guardarCarrito();
    //         this.mostrarCarrito();
    //     }
    // }

    vaciarCarrito() {
        this.carrito = [];
        this.total = 0;
        this.guardarCarrito();
        this.mostrarCarrito();
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'El carrito ha sido vaciado.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    }

    mostrarFormularioCompra() {
        const formularioDiv = document.getElementById("formulario-compra"); 
        formularioDiv.innerHTML = `
            <h3>Finalizar Compra</h3>
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu nombre">
            </div>
            <div class="mb-3">
                <label for="direccion" class="form-label">Dirección:</label>
                <input type="text" class="form-control" id="direccion" placeholder="Ingresa tu dirección">
            </div>
            <div class="btn-container">
                <button id="confirmarCompra" class="btn btn-primary">Confirmar Compra</button>
                <button id="cancelarCompra" class="btn btn-secondary">Cancelar</button>
            </div>
        `;

        document.getElementById("confirmarCompra").onclick = () => this.finalizarCompra();
        document.getElementById("cancelarCompra").onclick = () => this.volverAlMenuPrincipal();
    }

    finalizarCompra() {
        const nombre = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;
    
        if (nombre && direccion) {
            Swal.fire({
                title: 'Compra Confirmada',
                text: `Gracias por tu compra, ${nombre}. Te enviaremos los productos a ${direccion}.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Vaciar el carrito después de mostrar el mensaje
                this.vaciarCarrito();
                document.getElementById("formulario-compra").innerHTML = "";
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            this.carrito = JSON.parse(carritoGuardado);
            this.total = this.carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        }
    }

    salir() {
        Swal.fire({
            title: '¡Hasta luego!',
            text: 'Gracias por visitar nuestra tienda.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = 'https://www.google.com';
        });
    }
    
}

const tienda = new Tienda();
