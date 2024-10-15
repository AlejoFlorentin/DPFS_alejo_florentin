document.addEventListener('DOMContentLoaded', function () {
  // El evento DOMContentLoaded es un evento en JavaScript que se dispara cuando el documento HTML inicial ha sido completamente cargado y analizado por el navegador,
  //  sin esperar a que se carguen por completo las hojas de estilo, imágenes y subframes.
  const formLogin = document.getElementById('formLogin');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberAccountInput = document.getElementById('rememberPassword');
  const showHide = document.getElementById('show-hide');
  const errorEmail = document.getElementById('errorEmail');
  const errorPassword = document.getElementById('errorPassword');

  formLogin.addEventListener('submit', submitLog);

  loadSavedCredentials();

  function submitLog(event) {
    if (!formValidation()) {
      event.preventDefault();
    } else {
      event.preventDefault();
      rememberAccount();
      alert('Ingresaste con exito');
    }
  }

  function formValidation() {
    let validation = true;

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValue = emailInput.value.trim(); // el trim lo que hace es eliminar espacios vacíos al comienzo y final del input

    if (!emailRegex.test(emailValue)) {
      errorEmail.innerHTML = 'Ingresa un email válido';
      validation = false;
    } else {
      errorEmail.innerHTML = '';
    }

    const passwordValue = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userFind = users.find(user => user.email === emailValue);

    if (passwordValue.length < 6) {
      errorPassword.innerHTML = 'Ingresa una contraseña de al menos 6 caracteres';
      validation = false;
    } else if (userFind.password != passwordValue) {
      errorPassword.innerHTML = 'Contraseña incorrecta';
      validation = false;
    } else {
      errorPassword.innerHTML = '';
    }

    return validation;
  }

  showHide.addEventListener('click', function () {
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  function saveToLocalStorage() {
    const user = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    // Recuperar el array de usuarios del localStorage o crear uno nuevo si no existe
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Añadir el nuevo usuario al array
    users.push(user);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Usuarios guardados:', users);
  }

  //Funcion para recordar cuenta
  function rememberAccount() {
    if (rememberAccountInput.checked) {
      saveToLocalStorage();
    }
  }

  //Funcion para validar si las credenciales ingresadas son correctas
  function loadSavedCredentials() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Usar forEach con una función flecha para recorrer cada usuario guardado
    users.forEach(user => {
      if (user.email) {
        emailInput.value = user.email;
        passwordInput.value = user.password;
      }
    });
  }
});
