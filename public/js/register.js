document.querySelector("form").addEventListener("submit", submitFunction);

function submitFunction(event) {
  if (!formValidation()) {
    event.preventDefault(); //  se evita el envío si hay errores
  }

  Swal.fire({
    title: "Registro Exitoso!",
    text: "Fuiste registrado con exito!",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    this.submit(); // Envía el formulario después de la alerta
  });
}

function formValidation() {
  const inputsText = document.querySelectorAll('input[type="text"]');
  const inputEmail = document.getElementById("email");
  const inputRepeatEmail = document.getElementById("repeatEmail");
  const inputPassword = document.getElementById("password");
  const inputRepeatPassword = document.getElementById("repeatPassword");
  const inputTerms = document.getElementById("termsAccept");
  const inputCategory = document.getElementById("category");

  let validation = true;

  inputsText.forEach((field) => {
    let errorField = document.getElementById(
      "error" + field.id.charAt(0).toUpperCase() + field.id.slice(1)
    );

    if (field.value === "") {
      errorField.innerHTML = "Campo incompleto";
      validation = false;
    } else if (field.value.length < 3) {
      errorField.innerHTML = "Se necesita al menos 3 caracteres";
      validation = false;
    } else {
      errorField.innerHTML = "";
    }
  });

  const errorEmail = document.getElementById("errorEmail");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(inputEmail.value)) {
    errorEmail.innerHTML = "";
  } else {
    errorEmail.innerHTML = "Ingrese un correo electrónico válido";
    validation = false;
  }

  const errorRepeatEmail = document.getElementById("errorRepeatEmail");
  if (inputRepeatEmail.value === "") {
    errorRepeatEmail.innerHTML = "Campo incompleto";
    validation = false;
  } else if (inputRepeatEmail.value !== inputEmail.value) {
    errorRepeatEmail.innerHTML = "Los emails no coinciden";
    validation = false;
  } else {
    errorRepeatEmail.innerHTML = "";
  }

  const errorPassword = document.getElementById("errorPassword");

  if (inputPassword.value === "") {
    errorPassword.innerHTML = "Campo incompleto";
    validation = false;
  } else if (
    inputPassword.value.length < 10 ||
    !/[A-Z]/.test(inputPassword.value) ||
    !/[0-9]/.test(inputPassword.value) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword.value)
  ) {
    let errorMessage =
      "La contraseña debe cumplir con los siguientes requisitos:<br>";
    if (inputPassword.value.length < 10)
      errorMessage += "Debe tener al menos 10 caracteres.<br>";
    if (!/[A-Z]/.test(inputPassword.value))
      errorMessage += "Debe contener una letra mayúscula.<br>";
    if (!/[0-9]/.test(inputPassword.value))
      errorMessage += "Debe contener un número.<br>";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword.value))
      errorMessage += "Debe contener un carácter especial.<br>";
    errorPassword.innerHTML = errorMessage;
    validation = false;
  } else {
    errorPassword.innerHTML = "";
  }

  const errorRepeatPassword = document.getElementById("errorRepeatPassword");
  if (inputRepeatPassword.value === "") {
    errorRepeatPassword.innerHTML = "Campo incompleto";
    validation = false;
  } else if (inputRepeatPassword.value !== inputPassword.value) {
    errorRepeatPassword.innerHTML = "Las contraseñas no coinciden";
    validation = false;
  } else {
    errorRepeatPassword.innerHTML = "";
  }

  const errorTerms = document.getElementById("errorTerms");
  if (!inputTerms.checked) {
    errorTerms.innerHTML = "¡Debes aceptar los términos y condiciones!";
    validation = false;
  } else {
    errorTerms.innerHTML = "";
  }

  const errorCategory = document.getElementById("errorCategory");
  if (!inputCategory.value) {
    errorCategory.innerHTML = "Debes seleccionar una categoría";
    validation = false;
  } else {
    errorCategory.innerHTML = "";
  }

  return validation;
}
