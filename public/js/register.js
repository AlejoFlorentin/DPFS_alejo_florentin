document.getElementById('form').addEventListener('submit', submitFunction);

function submitFunction(event) {
  if (!formValidation()) {
    event.preventDefault();
    return;
  }
}

function formValidation() {
  const inputsText = document.querySelectorAll('input[type="text"]');
  const inputEmail = document.getElementById('email');
  const inputRepeatEmail = document.getElementById('repeatEmail');
  const inputPassword = document.getElementById('password');
  const inputRepeatPassword = document.getElementById('repeatPassword');
  const inputTerms = document.getElementById('termsAccept');
  const inputFile = document.getElementById('image');

  let validation = true;

  inputsText.forEach(field => {
    let errorField = document.getElementById(
      'error' + field.id.charAt(0).toUpperCase() + field.id.slice(1)
    );

    if (field.value === '') {
      errorField.innerHTML = 'Campo incompleto';
      validation = false;
    } else if (field.value.length < 2) {
      errorField.innerHTML = 'Se necesita al menos 2 caracteres';
      validation = false;
    } else {
      errorField.innerHTML = '';
    }
  });

  const errorEmail = document.getElementById('errorEmail');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(inputEmail.value)) {
    errorEmail.innerHTML = '';
  } else {
    errorEmail.innerHTML = 'Ingrese un correo electrónico válido';
    validation = false;
  }

  const errorRepeatEmail = document.getElementById('errorRepeatEmail');
  if (inputRepeatEmail.value === '') {
    errorRepeatEmail.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (inputRepeatEmail.value !== inputEmail.value) {
    errorRepeatEmail.innerHTML = 'Los emails no coinciden';
    validation = false;
  } else {
    errorRepeatEmail.innerHTML = '';
  }

  const errorPassword = document.getElementById('errorPassword');

  if (inputPassword.value === '') {
    errorPassword.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (
    inputPassword.value.length < 8 ||
    !/[A-Z]/.test(inputPassword.value) ||
    !/[0-9]/.test(inputPassword.value) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword.value)
  ) {
    let errorMessage = 'La contraseña debe cumplir con los siguientes requisitos:<br>';
    if (inputPassword.value.length < 8) errorMessage += 'Debe tener al menos 8 caracteres.<br>';
    if (!/[A-Z]/.test(inputPassword.value))
      errorMessage += 'Debe contener una letra mayúscula.<br>';
    if (!/[0-9]/.test(inputPassword.value)) errorMessage += 'Debe contener un número.<br>';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword.value))
      errorMessage += 'Debe contener un carácter especial.<br>';
    errorPassword.innerHTML = errorMessage;
    validation = false;
  } else {
    errorPassword.innerHTML = '';
  }

  const errorRepeatPassword = document.getElementById('errorRepeatPassword');
  if (inputRepeatPassword.value === '') {
    errorRepeatPassword.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (inputRepeatPassword.value !== inputPassword.value) {
    errorRepeatPassword.innerHTML = 'Las contraseñas no coinciden';
    validation = false;
  } else {
    errorRepeatPassword.innerHTML = '';
  }

  const errorTerms = document.getElementById('errorTerms');
  if (!inputTerms.checked) {
    errorTerms.innerHTML = '¡Debes aceptar los términos y condiciones!';
    validation = false;
  } else {
    errorTerms.innerHTML = '';
  }

  const errorImage = document.getElementById('errorImage');
  if (inputFile.value) {
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];

    if (!validTypes.includes(file.type)) {
      errorImage.innerHTML = 'Formato de imagen no válido. Solo se permiten PNG, JPEG y GIF.';
      validation = false;
    } else {
      errorImage.innerHTML = '';
    }
  }

  return validation;
}
