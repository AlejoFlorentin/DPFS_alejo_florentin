document.addEventListener('DOMContentLoaded', () => {
  let counter = 1;

  const btnSum = document.getElementById('btn-sum');
  const btnRest = document.getElementById('btn-rest');
  const spanCounter = document.getElementById('counter');
  const btnAdd = document.getElementById('btn-add-product');
  const inputCounter = document.getElementById('input-counter');
  const stock = spanCounter.value;
  btnSum.addEventListener('click', () => {
    if (counter < stock) {
      counter++;
      spanCounter.innerText = counter;
      inputCounter.value = counter;
    }
  });

  btnRest.addEventListener('click', () => {
    if (counter > 1) {
      counter--;
      spanCounter.innerText = counter;
      inputCounter.value = counter;
    }
  });

  btnAdd.addEventListener('click', () => {
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
