document.addEventListener("DOMContentLoaded", function () {
  // El evento DOMContentLoaded es un evento en JavaScript que se dispara cuando el documento HTML inicial ha sido completamente cargado y analizado por el navegador,
  //  sin esperar a que se carguen por completo las hojas de estilo, imágenes y subframes.
  const formLogin = document.getElementById("formLogin");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberAccountInput = document.getElementById("rememberPassword");
  const showHide = document.getElementById("show-hide");
  const errorEmail = document.getElementById("errorEmail");
  const errorPassword = document.getElementById("errorPassword");

  formLogin.addEventListener("submit", submitLog);

  loadSavedCredentials();

  function submitLog(event) {
    if (!formValidation()) {
      event.preventDefault();
    } else {
      event.preventDefault();

      alert("Ingresaste con exito");
    }
  }

  function formValidation() {
    let validation = true;

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValue = emailInput.value.trim(); // el trim lo que hace es eliminar espacios vacíos al comienzo y final del input

    if (!emailRegex.test(emailValue)) {
      errorEmail.innerHTML = "Ingresa un email válido";
      validation = false;
    } else {
      errorEmail.innerHTML = "";
    }

    const passwordValue = passwordInput.value.trim();

    if (passwordValue.length < 6) {
      errorPassword.innerHTML =
        "Ingresa una contraseña de al menos 6 caracteres";
      validation = false;
    } else {
      errorPassword.innerHTML = "";
    }

    return validation;
  }

  showHide.addEventListener("click", function () {
    if (passwordInput.type == "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
});
