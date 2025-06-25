document.addEventListener('DOMContentLoaded', () => {
  let contador = 1;

  const btnSumar = document.getElementById('btn-sumar');
  const btnRestar = document.getElementById('btn-restar');
  const spanContador = document.getElementById('contador');
  const btnAgregar = document.getElementById('agregarAlCarrito');
  const inputContador = document.getElementById('input-contador');
  const stock = spanContador.value;
  btnSumar.addEventListener('click', () => {
    if (contador < stock) {
      contador++;
      spanContador.innerText = contador;
      inputContador.value = contador;
    }
  });

  btnRestar.addEventListener('click', () => {
    if (contador > 1) {
      contador--;
      spanContador.innerText = contador;
      inputContador.value = contador;
    }
  });

  btnAgregar.addEventListener('click', () => {
    Toastify({
      text: 'Producto Agregado',
      duration: 2000,
      gravity: 'top',
      position: 'right',
      offset: { x: 20, y: 150 },
      style: {
        background: 'black',
      },
    }).showToast();
  });
});
