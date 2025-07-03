document.addEventListener("DOMContentLoaded", ()=>{
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderizarProductos = ()=>{
        
        url= "https://dummyjson.com/products/category/sports-accessories";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let contenedorProductos = document.getElementById("contenedor-tarjetas");

                for(const producto of data.products){
                    let tarjetaProducto = document.createElement("div");
                    tarjetaProducto.classList.add("tarjeta");

                    let imagenProducto = document.createElement("img");
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.description;

                    let tituloProducto = document.createElement("p");
                    tituloProducto.classList.add("titulo-producto");
                    tituloProducto.textContent = producto.title;

                    let precioProducto = document.createElement("p");
                    precioProducto.classList.add("precio");
                    precioProducto.textContent = `$${producto.price}`;

                    let btnAgregar = document.createElement("button")
                    btnAgregar.classList.add("boton-producto")
                    btnAgregar.textContent = "Agregar"

                    btnAgregar.addEventListener("click", ()=>{
                        alert(`${producto.title} agregado al carrito`);
                        agregarProducto(producto);
                        actualizarAgregados();
                    })

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(btnAgregar);

                    contenedorProductos.appendChild(tarjetaProducto)
                    
                }

            }) 
            .catch(err => console.error("Error: ", err));    
    
    };

	const agregarProducto = (producto)=>{
		carrito.push(producto);
		localStorage.setItem("carrito",JSON.stringify(carrito));
	}

	const actualizarAgregados= ()=>{
		const contadorCarrito = document.getElementById("contador-carrito");
		contadorCarrito.textContent = carrito.length;
	}
    
	renderizarProductos();
	actualizarAgregados();
});