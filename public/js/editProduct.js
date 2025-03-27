document
  .getElementById("editProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario inmediatamente

    Swal.fire({
      title: "Producto Editado",
      text: "El producto ha sido editado correctamente",
      icon: "success",
      timer: 1500, // Se cierra automáticamente en 1.5 segundos
      showConfirmButton: false,
    }).then(() => {
      this.submit(); // Envía el formulario después de la alerta
    });
  });
