//funciones para redireccionar a las paginas de registro y login por medio de los botones
function registerRedirect() {
  window.location.href = "/HTML/register.html";
}
function loginRedirect(){
  window,location.href = "/HTML/login.html";
}
// Función para cargar y mostrar los productos en la página principal
function loadServicios() {
  const serviciosList = document.getElementById('servicios-list');
  let servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  // Limpiar el contenedor de productos
  serviciosList.innerHTML = '';

  // Crear las tarjetas de productos
  servicios.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
    <div class="card-servicio d-flex align-items-start">
        <img src="${product.image}" alt="${product.name}" class="service-icon me-3">
        <div>
            <h3 class="service-title">${product.name}</h3>
            <p class="service-description">${product.description}</p>
            <p class="price-servicio">Precio: $${product.price}</p>
            <p class="cantidad-servicio">Cantidad disponible: ${product.quantity}</p>
            ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
            <button class="add-to-cart-btn-servicios info-button " ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">
                Agregar al carrito
            </button>
        </div>
    </div>
`;

    serviciosList.appendChild(productCard);
  });

  // Agregar eventos a los botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart-btn-servicios').forEach(button => {
    button.addEventListener('click', function() {
      const productIndex = this.getAttribute('data-index');
      const selectedProduct = servicios[productIndex];
      agregarAlCarrito(selectedProduct);
    });
  });
}

// Función para cargar y mostrar los productos en la página principal
function loadPiezas() {
  const piezasList = document.getElementById('piezas-list');
  let piezas = JSON.parse(localStorage.getItem('piezas')) || [];

  // Limpiar el contenedor de productos
  piezasList.innerHTML = '';

  // Crear las tarjetas de productos
  piezas.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <p>Cantidad disponible: ${product.quantity}</p>
      ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
      <button class="add-to-cart-btn-piezas info-button " ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">Agregar al carrito</button>
    `;

    piezasList.appendChild(productCard);
  });

  // Agregar eventos a los botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart-btn-piezas').forEach(button => {
    button.addEventListener('click', function() {
      const productIndex = this.getAttribute('data-index');
      const selectedProduct = piezas[productIndex];
      agregarAlCarrito(selectedProduct);
    });
  });
}






 // Cargar los productos cuando se cargue la página principal
 document.addEventListener('DOMContentLoaded', function() {

  
    loadServicios();
    loadPiezas();
  
});
//////////////////////////////////////////////////////////

// Función para verificar si hay un usuario logueado y actualizar la navegación
function updateNav() {
   const loggedInUser = localStorage.getItem('loggedInUser');
   const loginLink = document.getElementById('login-link');
   const registerLink = document.getElementById('register-link');
   const logoutLink = document.getElementById('logout-link');
   const historialLink = document.getElementById('historial-link');
   const welcomeMessage = document.getElementById('welcome-message');
   const productosLink = document.getElementById('productos-link');
   const cartButton = document.getElementById('cart-btn');

 if (loggedInUser === 'admin') {
  productosLink.style.display = 'inline';
  console.log('sadasdasda')
}
 
   if (loggedInUser) {
     // Si hay un usuario logueado
     loginLink.style.display = 'none';  
     registerLink.style.display = 'none';  
     historialLink.style.display = 'inline';
     welcomeMessage.style.display = 'inline';  
     welcomeMessage.textContent = `Bienvenido, ${loggedInUser}`;  
     logoutLink.style.display = 'inline';  
     cartButton.style.display = 'inline'
   } else {
     // Si no hay usuario logueado
     loginLink.style.display = 'inline';  
     registerLink.style.display = 'inline'; 
     welcomeMessage.style.display = 'none';  
     logoutLink.style.display = 'none';  
   }
 }
 
 // Función para cerrar sesión
 function logoutUser() {
   localStorage.removeItem('loggedInUser');  
   alert('Has cerrado sesión exitosamente.');
   updateNav();  // Actualizar la barra de navegación
   window.location.href = '../index.html';  // Redirigir a la página principal
 }
 
 // Evento para gestionar el cierre de sesión
 document.addEventListener('DOMContentLoaded', function() {
   updateNav();  // Llamar a la función para actualizar la navegación cuando la página cargue
 
   const logoutLink = document.getElementById('logout-link');
   if (logoutLink) {
     logoutLink.addEventListener('click', logoutUser);
   }
 });



