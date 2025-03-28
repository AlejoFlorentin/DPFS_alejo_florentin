document.querySelector("form").addEventListener("submit", submitFunction);

function submitFunction(event) {
  if (!formValidation()) {
    event.preventDefault();
  } else {
    event.preventDefault();

    alert(
      "Los datos enviados fueron: \n" +
        "Nombre: " +
        document.getElementById("name").value +
        "\n" +
        "Apellido: " +
        document.getElementById("lastName").value +
        "\n" +
        "Telefono: " +
        document.getElementById("phone").value +
        "\n" +
        "Email: " +
        document.getElementById("email").value +
        "\n" +
        "Contraseña: " +
        document.getElementById("password").value +
        "\n"
    );
  }
}

function formValidation() {
  const inputsText = document.querySelectorAll('input[type="text"]');
  const inputEmail = document.getElementById("email");
  const inputRepeatEmail = document.getElementById("repeatEmail");
  const inputPassword = document.getElementById("password");
  const inputRepeatPassword = document.getElementById("repeatPassword");
  const inputTerms = document.getElementById("termsAccept");

  let validation = true;

  inputsText.forEach((field) => {
    let errorField = document.getElementById(
      "error" + field.id.charAt(0).toUpperCase() + field.id.slice(1)
    );

    if (field.value.length == "") {
      errorField.innerHTML = "Campo incompleto";
      validation = false;
    } else if (field.value.length > 0 && field.value.length < 3) {
      errorField.innerHTML = "Se necesita al menos 3 caracteres";
      validation = false;
    } else {
      errorField.innerHTML = "";
    }
  });

  const errorEmail = document.getElementById("errorEmail");

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value)) {
    errorEmail.innerHTML = "";
  } else {
    errorEmail.innerHTML = "Ingrese un correo electronico valido";
    validation = false;
  }

  const errorRepeatEmail = document.getElementById("errorRepeatEmail");

  if (inputRepeatEmail.value.length == "") {
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

    if (inputPassword.value.length < 10) {
      errorMessage += "Debe contener al menos 10 caracteres.<br>";
    }
    if (!/[A-Z]/.test(inputPassword.value)) {
      errorMessage += "Debe contener al menos una letra mayúscula.<br>";
    }
    if (!/[0-9]/.test(inputPassword.value)) {
      errorMessage += "Debe contener al menos un número.<br>";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword.value)) {
      errorMessage += "Debe contener al menos un carácter especial.<br>";
    }

    errorPassword.innerHTML = errorMessage;
    validation = false;
  } else {
    errorPassword.innerHTML = "";
  }

  const errorRepeatPassword = document.getElementById("errorRepeatPassword");

  if (inputRepeatPassword.value.length == "") {
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

  return validation;
}
