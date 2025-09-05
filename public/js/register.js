document.getElementById('form').addEventListener('submit', submitFunction);

function submitFunction(event) {
  if (!formValidation()) {
    event.preventDefault();
    return;
  }
}

function formValidation() {
  const inputName = document.getElementById('name');
  const inputLastName = document.getElementById('last-name');
  const inputEmail = document.getElementById('email');
  const inputRepeatEmail = document.getElementById('repeat-email');
  const inputPassword = document.getElementById('password');
  const inputRepeatPassword = document.getElementById('repeat-password');
  const inputTerms = document.getElementById('terms');
  const inputFile = document.getElementById('image');

  let validation = true;

  const errorName = document.getElementById('error-name');
  if (inputName.value === '') {
    errorName.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (inputName.value.length < 2) {
    errorName.innerHTML = 'Se necesita al menos 2 caracteres';
    validation = false;
  } else {
    errorName.innerHTML = '';
  }

  const errorLastName = document.getElementById('error-last-name');
  if (inputLastName.value === '') {
    errorLastName.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (inputLastName.value.length < 2) {
    errorLastName.innerHTML = 'Se necesita al menos 2 caracteres';
    validation = false;
  } else {
    errorLastName.innerHTML = '';
  }

  const errorEmail = document.getElementById('error-email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (inputEmail.value === '') {
    errorEmail.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (!emailRegex.test(inputEmail.value)) {
    errorEmail.innerHTML = 'Ingrese un correo electrónico válido';
    validation = false;
  } else {
    errorEmail.innerHTML = '';
  }

  const errorRepeatEmail = document.getElementById('error-repeat-email');
  if (inputRepeatEmail.value === '') {
    errorRepeatEmail.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (inputRepeatEmail.value !== inputEmail.value) {
    errorRepeatEmail.innerHTML = 'Los emails no coinciden';
    validation = false;
  } else {
    errorRepeatEmail.innerHTML = '';
  }

  const errorPassword = document.getElementById('error-password');

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

  const errorRepeatPassword = document.getElementById('error-repeat-password');
  if (inputRepeatPassword.value === '') {
    errorRepeatPassword.innerHTML = 'Campo incompleto';
    validation = false;
  } else if (inputRepeatPassword.value !== inputPassword.value) {
    errorRepeatPassword.innerHTML = 'Las contraseñas no coinciden';
    validation = false;
  } else {
    errorRepeatPassword.innerHTML = '';
  }

  const errorTerms = document.getElementById('error-terms');
  if (!inputTerms.checked) {
    errorTerms.innerHTML = '¡Debes aceptar los términos y condiciones!';
    validation = false;
  } else {
    errorTerms.innerHTML = '';
  }

  const errorImage = document.getElementById('error-image');
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
