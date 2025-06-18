// Agregar eventos de clic a los botones de "Agregar al carrito"
document.addEventListener('DOMContentLoaded', () => {
  let btnAddProduct = document.querySelectorAll('.btnAddProduct');

  btnAddProduct.forEach(button => {
    button.addEventListener('click', addProduct);
  });

  function addProduct(e) {
    Toastify({
      text: 'Producto Agregado',
      duration: 2000,
      gravity: 'top',
      position: 'right',
      offset: {
        x: 20,
        y: 150,
      },
      stopOnFocus: true,
      style: {
        background: 'black',
      },
    }).showToast();
  }
});
