document
  .getElementById("createProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario inmediatamente

    Swal.fire({
      title: "Producto Creado",
      text: "El producto ha sido creado correctamente",
      icon: "success",
      timer: 1500, // Se cierra automáticamente en 1.5 segundos
      showConfirmButton: false,
    }).then(() => {
      this.submit(); // Envía el formulario después de la alerta
    });
  });
