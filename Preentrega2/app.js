class Tienda {
  constructor() {
      this.categorias = {
          Anillos: [
              "Anillo de Oro",
              "Anillo de Plata",
              "Anillo de Diamantes",
              "Anillo de Rubí",
              "Anillo de Zafiro"
          ],
          Collares: [
              "Collar de Oro",
              "Collar de Perlas",
              "Collar de Esmeraldas",
              "Collar de Rubíes",
              "Collar de Diamantes"
          ],
          Pulseras: [
              "Pulsera de Oro",
              "Pulsera de Plata",
              "Pulsera de Rubíes",
              "Pulsera de Diamantes",
              "Pulsera de Esmeraldas"
          ],
          Pendientes: [
              "Pendientes de Oro",
              "Pendientes de Plata",
              "Pendientes de Diamantes",
              "Pendientes de Rubíes",
              "Pendientes de Esmeraldas"
          ],
      };
      this.carrito = [];
      this.mostrarMensajeCarritoVacio = false; // Funciona de testigo, para mostrar el mensaje "Tu carrito está vacío" o no
      this.init();
  }

  init() {
      this.cargarCarrito();
      this.mostrarMenuPrincipal();
  }

  mostrarMensaje(mensaje, tipo = "info") {
      const mensajeDiv = document.getElementById("mensaje");
      mensajeDiv.className = `alert alert-${tipo}`;
      mensajeDiv.textContent = mensaje;
      mensajeDiv.classList.remove("d-none");
  }

  ocultarMensaje() {
      const mensajeDiv = document.getElementById("mensaje");
      mensajeDiv.classList.add("d-none");
  }

  mostrarMenuPrincipal() {
      const menuPrincipalDiv = document.getElementById("menu-principal");
      menuPrincipalDiv.innerHTML = "<h2>Seleccione una categoría:</h2>";

      const categoriasArray = Object.keys(this.categorias);
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

      const productosArray = this.categorias[categoria];
      productosArray.forEach((producto, index) => {
          const boton = document.createElement("button");
          boton.textContent = `${index + 1}. ${producto}`;
          boton.className = "btn btn-outline-secondary btn-full-width mb-2";
          boton.onclick = () => this.agregarAlCarrito(producto);
          productosDiv.appendChild(boton);
      });

      const volverBtn = document.createElement("button");
      volverBtn.textContent = `${productosArray.length + 1}. Volver al menú principal`;
      volverBtn.className = "btn btn-warning btn-full-width mt-3";
      volverBtn.onclick = () => this.volverAlMenuPrincipal();
      productosDiv.appendChild(volverBtn);
  }

  agregarAlCarrito(producto) {
      this.carrito.push(producto);
      this.guardarCarrito();
      this.mostrarMensaje(`Has añadido ${producto} a tu carrito.`, "success");
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
              const item = document.createElement("p");
              item.textContent = `${index + 1}. ${producto}`;
              carritoDiv.appendChild(item);
          });

          const btnContainer = document.createElement("div");
          btnContainer.className = "btn-container";

          const finalizarBtn = document.createElement("button");
          finalizarBtn.textContent = "Finalizar compra";
          finalizarBtn.className = "btn btn-success btn-full-width mt-3";
          finalizarBtn.onclick = () => this.mostrarFormularioCompra();
          btnContainer.appendChild(finalizarBtn);

          const vaciarBtn = document.createElement("button");
          vaciarBtn.textContent = "Vaciar carrito";
          vaciarBtn.className = "btn btn-danger btn-full-width mt-2";
          vaciarBtn.onclick = () => {
              this.vaciarCarrito();
              this.mostrarMensajeCarritoVacio = true; // Activar para mostrar el mensaje al vaciar
          };
          btnContainer.appendChild(vaciarBtn);

          carritoDiv.appendChild(btnContainer);
      } else if (this.mostrarMensajeCarritoVacio) {
          carritoDiv.innerHTML = "<p>Tu carrito está vacío.</p>";
      }
  }

  vaciarCarrito() {
      this.carrito = [];
      this.guardarCarrito();
      this.mostrarMensaje("El carrito ha sido vaciado.", "info");
      this.mostrarCarrito(); // Actualizar la vista del carrito
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
      document.getElementById("cancelarCompra").onclick = () => {
          this.mostrarMensaje("Compra cancelada.", "warning");
          this.volverAlMenuPrincipal(); 
      };
  }

  finalizarCompra() {
      const nombre = document.getElementById("nombre").value;
      const direccion = document.getElementById("direccion").value;

      if (nombre && direccion) {
          this.mostrarMensaje(
              `Gracias por tu compra, ${nombre}. Tus productos serán enviados a ${direccion}.`,
              "success"
          );
          this.carrito = []; // Vaciamos el carrito después de la compra
          this.guardarCarrito(); // Actualizamos localStorage
          this.mostrarMensajeCarritoVacio = true; // Activar para mostrar el mensaje al finalizar compra
          this.volverAlMenuPrincipal();
      } else {
          this.mostrarMensaje("Compra cancelada. Se requiere nombre y dirección.", "danger");
      }
  }

  salir() {
      const menuPrincipalDiv = document.getElementById("menu-principal");
      const productosDiv = document.getElementById("productos");
      const carritoDiv = document.getElementById("carrito");
      const mensajeDiv = document.getElementById("mensaje");
      const formularioCompraDiv = document.getElementById("formulario-compra");

      menuPrincipalDiv.innerHTML = "";
      productosDiv.innerHTML = "";
      carritoDiv.innerHTML = "";
      mensajeDiv.innerHTML = "";
      formularioCompraDiv.innerHTML = "";

      const appDiv = document.querySelector(".main-container");
      appDiv.innerHTML = "<div class='text-center'><h1>¡Hasta la próxima!</h1></div>";
  }

  cargarCarrito() {
      const carritoGuardado = localStorage.getItem("carrito");
      if (carritoGuardado) {
          this.carrito = JSON.parse(carritoGuardado);
      }
      this.mostrarCarrito(); // Actualizar la vista del carrito
  }

  guardarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }
}

const tienda = new Tienda();