const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>$${product.precio}</p>
          <span class="restar"> - </span>
          <p>${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: $${product.cantidad * product.precio}</p>
          <span class="delete-product"> 🗑️ </span>
        `;
  
      modalContainer.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        saveLocal();
        pintarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delete-product");
  
      eliminar.addEventListener("click", () => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Producto eliminado'
        })
        eliminarProducto(product.id);
      });
      
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
    
    const accionComprar = document.createElement("button");
    accionComprar.className = "accion-comprar";
    accionComprar.innerText = "Realizar compra"
    modalContainer.append(accionComprar);

    accionComprar.addEventListener("click", ()=> {
      Swal.fire({
        title: 'Compra realizada con éxito!',
        imageUrl: 'https://st4.depositphotos.com/17601448/23584/v/450/depositphotos_235847954-stock-illustration-happy-face-banner-with-smile.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    })
  };
  
  verCarrito.addEventListener("click", pintarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    console.log(foundId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
  
    carritoCounter();
    saveLocal();
    pintarCarrito();
  };
  
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  carritoCounter();

