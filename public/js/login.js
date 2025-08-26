document.addEventListener('DOMContentLoaded', function () {
  const formLogin = document.getElementById('formLogin');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const showHide = document.getElementById('show-hide');
  const errorEmail = document.getElementById('errorEmail');
  const errorPassword = document.getElementById('errorPassword');

  formLogin.addEventListener('submit', submitLog);

  function submitLog(event) {
    if (!formValidation()) {
      event.preventDefault();
      return;
    }

    if (error) return;
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

    if (passwordValue.length < 6) {
      errorPassword.innerHTML = 'Ingresa una contraseña de al menos 6 caracteres';
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
});
