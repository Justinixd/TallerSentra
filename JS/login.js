 // Inicio de sesión con verificación de administrador
 function loginUser(event) {
   event.preventDefault();
 
   const username = document.getElementById('login-username').value;
   const password = document.getElementById('login-password').value;
 
   const users = JSON.parse(localStorage.getItem('users')) || [];
   
   // Verificación del administrador
   if (username === 'admin' && password === '1234') {
     alert(`Bienvenido, administrador`);
     console.log("Administrador logueado");
     localStorage.setItem('loggedInUser', 'admin');  
     window.location.href = '/HTML/admin.html';  
     return;
   }
 
   // Verificación de un usuario normal
   const user = users.find(u => u.username === username && u.password === password);
 
   if (user) {
     alert(`Bienvenido, ${user.username}`);
     localStorage.setItem('loggedInUser', username);  
     window.location.href = '../index.html'; 
   } else {
     alert('Usuario o contraseña incorrectos');
   }
 }

 // Agregar los event listeners en los formularios
 document.addEventListener('DOMContentLoaded', function() {
   const loginForm = document.getElementById('login-form');

   if (loginForm) {
     loginForm.addEventListener('submit', loginUser);
   }
 });

