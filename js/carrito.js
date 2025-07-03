document.addEventListener("DOMContentLoaded", ()=>{
	let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

	const actualizarAgregados= ()=>{
			const contadorCarrito = document.getElementById("contador-carrito");
			contadorCarrito.textContent = carrito.length;
	}

	 // Elimina un producto del carrito
	const eliminarProducto = (indice) => {
			carrito.splice(indice, 1);
			localStorage.setItem("carrito", JSON.stringify(carrito));
			actualizarAgregados();
			pintarCarrito();
	};
	

	actualizarAgregados()

	const pintarCarrito = ()=>{
		carrito = JSON.parse(localStorage.getItem("carrito")) || []; // 🔁 REFRESCAR
		const listadoCompra = document.getElementById("contenedor-carrito");

		listadoCompra.innerHTML = ''; // ✅ LIMPIA EL CONTENEDOR

		if(carrito.length === 0){
			listadoCompra.innerHTML= '<h3>Tu carrito esta vacio 😧</h3>'
			
			}else{
					carrito.forEach((producto,indice) => {
											
						let tarjetaProducto = document.createElement("article");
						tarjetaProducto.classList.add("tarjeta-producto");
									
						let imagenProducto = document.createElement("img");
						imagenProducto.src = producto.images[0];
						imagenProducto.alt = producto.description;

						let tituloProducto = document.createElement("h3");
						tituloProducto.classList.add("titulo-producto");
						tituloProducto.textContent = producto.title;

						let precioProducto = document.createElement("p");
						precioProducto.textContent = `$${producto.price}`;

						let btnEliminar = document.createElement("button");
						btnEliminar.textContent = "Eliminar";

						btnEliminar.addEventListener("click", ()=>{
						alert(`${producto.title} eliminado del carrito`);
						eliminarProducto(indice);
						actualizarAgregados();
					})

						tarjetaProducto.appendChild(imagenProducto);
						tarjetaProducto.appendChild(tituloProducto);
						tarjetaProducto.appendChild(precioProducto);
						tarjetaProducto.appendChild(btnEliminar);

						listadoCompra.appendChild(tarjetaProducto);
					})
			}
			renderizarResumenCarrito();
	}

	const renderizarResumenCarrito = () => {
			carrito = JSON.parse(localStorage.getItem("carrito")) || []; // 🔁 REFRESCAR
			const resumen = document.getElementById("resumen-carrito");
			resumen.innerHTML = ""; // Limpiar contenido anterior

			if (carrito.length === 0) return; // No mostrar resumen si no hay productos

			// creado boton vaciar carrito
			let divAcciones = document.getElementById("acciones-carrito");
			divAcciones.innerHTML = "";
			let btnVaciar = document.createElement("button");
			btnVaciar.textContent = "Vaciar carrito";

			divAcciones.appendChild(btnVaciar);

			const vaciarCarrito = ()=>{
					localStorage.removeItem("carrito");
					alert("Vaciando carrito");
					carrito = [];
					btnVaciar.remove();
					pintarCarrito();
					actualizarAgregados();
					
			};

	btnVaciar.addEventListener("click", () =>{
		vaciarCarrito();
			})

			// Calcular total
			const cantidadProductos = carrito.length;
			const totalImporte = carrito.reduce((acc, producto) => acc + producto.price, 0);

			// Crear elementos
			const cantidad = document.createElement("p");
			cantidad.textContent = `Cantidad de productos:  ${cantidadProductos}`;

			const total = document.createElement("p");
			total.textContent = `Importe total:  $${totalImporte.toFixed(2)}`;

			const btnFinalizar = document.createElement("button");
			btnFinalizar.textContent = "Finalizar compra";
			

			// Evento del botón Finalizar compra
			btnFinalizar.addEventListener("click", () => {
					alert("Gracias por tu compra 🎉");
					localStorage.removeItem("carrito");
					carrito = [];
					pintarCarrito();
					actualizarAgregados()
					window.location.href = "../index.html";
			});

			// Agregar al DOM
			resumen.appendChild(cantidad);
			resumen.appendChild(total);
			resumen.appendChild(btnFinalizar);
	};


	pintarCarrito();

});