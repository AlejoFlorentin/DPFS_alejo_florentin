// Agregar eventos de clic a los botones de "Agregar al carrito"
document.addEventListener('DOMContentLoaded', () => {
  let btnAddProduct = document.querySelectorAll('.btnAddProduct');
  const btnFilter   = document.getElementById('filterBtn');
  const filterMenu  = document.getElementById('filter');

btnFilter.addEventListener('click', () => {
  console.log('Hola');
  // Alterna inline-style
  filterMenu.style.display = 
    filterMenu.style.display === 'block' ? 'none' : 'block';
});

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

  document.querySelectorAll('.formEliminarProducto').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Esta acción eliminará el producto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.isConfirmed) {
          form.submit();
        }
      });
    });
  });
});
