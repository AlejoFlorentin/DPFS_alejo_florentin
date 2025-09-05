document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.form-delete-product').forEach(form => {
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
