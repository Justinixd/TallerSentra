// Al cargar la página de administrador, verificamos si es el admin
function checkAdminAccess() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Verificar si el usuario está logueado y si es admin
  if (!loggedInUser || loggedInUser !== 'admin') {
    alert('Acceso denegado. Solo el administrador puede acceder a esta página.');
    window.location.href = '../index.html';  
  }
}

// Agregar los event listeners en los formularios
document.addEventListener('DOMContentLoaded', function() {
  // Si estamos en la página de administración, verificamos el acceso
  if (window.location.pathname.includes('admin.html')) {
    checkAdminAccess();
  }
  ////////////////
});
// Función para agregar productos
function addProduct(event) {
  event.preventDefault();

  const category = document.getElementById('product-category').value;
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const description = document.getElementById('product-description').value;
  const quantity = document.getElementById('product-quantity').value;
  const imageFile = document.getElementById('product-image').files[0];

  // Verificar que se haya ingresado todo
  if (!category ||!name || !price || !description || !quantity || !imageFile) {
    alert('Por favor, ingrese todos los campos');
    return;
  }

  // Convertir la imagen en base64 para guardarla
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageDataUrl = event.target.result;

    // Recuperar los productos de localStorage (o un arreglo vacío si no hay productos)
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    let piezas = JSON.parse(localStorage.getItem('piezas')) || [];

    // Crear el nuevo producto
    const newProduct = {
      category,
      name,
      price,
      description,
      quantity,
      image: imageDataUrl,  // Guardar la imagen en base64
    };


    if(category === "servicios"){
      // Agregar el producto al arreglo  de servicios y guardar en localStorage
      servicios.push(newProduct);
    localStorage.setItem('servicios', JSON.stringify(servicios));
    }

    if(category === "piezas"){
      // Agregar el producto al arreglo  de piezas y guardar en localStorage
      piezas.push(newProduct);
    localStorage.setItem('piezas', JSON.stringify(piezas));
    }

    
    location.reload();
    alert('Producto agregado exitosamente');
    document.getElementById('add-product-form').reset(); 
    
  };

  reader.readAsDataURL(imageFile);  
  
}

// Agregar el evento al formulario de productos
document.addEventListener('DOMContentLoaded', function() {
  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
  }
});




// Función para mostrar los servicios en la página
function displayServicios() {
 const serviciosList = document.getElementById('servicios-list');
 serviciosList.innerHTML = ''; // Limpiar el contenido anterior

 let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
 

 if (servicios.length === 0) {
   serviciosList.innerHTML = '<p>No hay productos disponibles.</p>';
   return;
 }

 servicios.forEach((product, index) => {
   const productDiv = document.createElement('div');
   productDiv.classList.add('product-item');
   
   productDiv.innerHTML = `
      <div class="card-servicio">
      <img src="${product.image}"  alt="${product.name}" style="max-width: 100px;">
      <h3>${product.name}</h3>
      <p class="price-servicio">Precio: $${product.price}</p>
      <p class="description-servicio">Descripción: ${product.description}</p>
      <p class="cantidad-servicio">Cantidad: ${product.quantity}</p>
      <button class="edit-servicio" onclick="editServicios(${index})">Editar</button>
      <button class="delete--servicio" onclick="deleteServicios(${index})">Eliminar</button>
      </div>
   `;

   serviciosList.appendChild(productDiv);
 });
}

// Función para mostrar los piezas en la página
function displayPiezas() {
  const piezasList = document.getElementById('piezas-list');
  piezasList.innerHTML = ''; // Limpiar el contenido anterior
 
  let piezas = JSON.parse(localStorage.getItem('piezas')) || [];
  
 
  if (piezas.length === 0) {
    piezasList.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }
 
  piezas.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    
    productDiv.innerHTML = `
      <div>
      <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
      <p>Descripción: ${product.description}</p>
      <p>Cantidad: ${product.quantity}</p>
      <button onclick="editPiezas(${index})">Editar</button>
      <button onclick="deletePiezas(${index})">Eliminar</button>
      </div>
    `;
 
    piezasList.appendChild(productDiv);
  });
 }
 

// Llamar a la función para mostrar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
 displayServicios();
 displayPiezas();
});
/////////////////////////////////////////
// Función para eliminar un servicio
function deleteServicios(index) {
 let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
 
 // Eliminar el producto del array
 servicios.splice(index, 1);
 
 // Guardar el nuevo array en localStorage
 localStorage.setItem('servicios', JSON.stringify(servicios));

 // Actualizar la lista de productos en pantalla
 displayServicios();
 
 alert('Servicio eliminado correctamente.');
 
}
/////////////////////////////////////////
// Función para eliminar un producto
function deletePiezas(index) {
  let piezas = JSON.parse(localStorage.getItem('piezas')) || [];
  
  // Eliminar el producto del array
  piezas.splice(index, 1);
  
  // Guardar el nuevo array en localStorage
  localStorage.setItem('piezas', JSON.stringify(piezas));
 
  // Actualizar la lista de productos en pantalla
  displayPiezas();
  
  alert('Pieza eliminada correctamente.');
  
 }
 //////////////////////////////////////////
// Función para editar un producto
function editServicios(index) {
 let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
 // Cargar la información del producto en el formulario
 const product = servicios[index];
 document.getElementById('product-category').value = product.category;
 document.getElementById('product-name').value = product.name;
 document.getElementById('product-price').value = product.price;
 document.getElementById('product-description').value = product.description;
 document.getElementById('product-quantity').value = product.quantity;
 

 // Cambiar el comportamiento del botón de agregar a actualizar
 const form = document.getElementById('add-product-form');
 const submitButton = form.querySelector('button[type="submit"]');
 submitButton.textContent = 'Actualizar Servicio';

 // Quitar el evento anterior
 form.removeEventListener('submit', addProduct);

 // Añadir un nuevo evento para actualizar el producto
 form.addEventListener('submit', function updateProduct(event) {
   event.preventDefault();

   const updatedProduct = {
     category: document.getElementById('product-category').value,
     name: document.getElementById('product-name').value,
     price: document.getElementById('product-price').value,
     description: document.getElementById('product-description').value,
     quantity: document.getElementById('product-quantity').value,
     image: product.image // Mantener la imagen previa
   };

   // Actualizar el producto en el array
   servicios[index] = updatedProduct;
   localStorage.setItem('servicios', JSON.stringify(servicios));

   alert('Servicio actualizado correctamente.');
   submitButton.textContent = 'Agregar Servicio';

   // Limpiar el formulario
   form.reset();

   // Restaurar el comportamiento original del formulario
   form.removeEventListener('submit', updateProduct);
   form.addEventListener('submit', addProduct);

   // Actualizar la lista de productos en pantalla
   displayServicios();
   
 });
}
//////////////////////
function editPiezas(index) {
  let piezas = JSON.parse(localStorage.getItem('piezas')) || [];
  // Cargar la información del producto en el formulario
  const product = piezas[index];
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-description').value = product.description;
  document.getElementById('product-quantity').value = product.quantity;
  
 
  // Cambiar el comportamiento del botón de agregar a actualizar
  const form = document.getElementById('add-product-form');
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = 'Actualizar Piezas';
 
  // Quitar el evento anterior
  form.removeEventListener('submit', addProduct);
 
  // Añadir un nuevo evento para actualizar el producto
  form.addEventListener('submit', function updateProduct(event) {
    event.preventDefault();
 
    const updatedProduct = {
      category: document.getElementById('product-category').value,
      name: document.getElementById('product-name').value,
      price: document.getElementById('product-price').value,
      description: document.getElementById('product-description').value,
      quantity: document.getElementById('product-quantity').value,
      image: product.image // Mantener la imagen previa
    };
 
    // Actualizar el producto en el array
    piezas[index] = updatedProduct;
    localStorage.setItem('servicios', JSON.stringify(piezas));
 
    alert('Producto actualizado correctamente.');
    submitButton.textContent = 'Agregar Producto';
 
    // Limpiar el formulario
    form.reset();
 
    // Restaurar el comportamiento original del formulario
    form.removeEventListener('submit', updateProduct);
    form.addEventListener('submit', addProduct);
 
    // Actualizar la lista de productos en pantalla
    displayPiezas();
    
  });
 }





