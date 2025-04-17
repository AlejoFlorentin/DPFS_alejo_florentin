document.addEventListener("DOMContentLoaded", () => {
  let contador = 1;

  const btnSumar = document.getElementById("btn-sumar");
  const btnRestar = document.getElementById("btn-restar");
  const spanContador = document.getElementById("contador");
  const btnAgregar = document.getElementById("agregarAlCarrito");
  const stock = parseInt(btnAgregar.dataset.stock);
  btnSumar.addEventListener("click", () => {
    if (contador < stock) {
      contador++;
      spanContador.innerText = contador;
    }
  });

  btnRestar.addEventListener("click", () => {
    if (contador > 1) {
      contador--;
      spanContador.innerText = contador;
    }
  });

  btnAgregar.addEventListener("click", () => {
    const productId = btnAgregar.dataset.id;
    const title = btnAgregar.dataset.title;
    const price = parseFloat(btnAgregar.dataset.price);
    const img = btnAgregar.dataset.img;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find((p) => p.id === productId);

    const totalDeseado = productoExistente
      ? productoExistente.cantidad + contador
      : contador;
    if (productoExistente) {
      productoExistente.cantidad += contador;
    } else {
      carrito.push({
        id: productId,
        title,
        price,
        img,
        cantidad: contador,
      });
    }
    if (totalDeseado > stock) {
      Toastify({
        text: "No podés agregar más de lo disponible en stock",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: { background: "red" },
      }).showToast();
      return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    Toastify({
      text: "Producto Agregado",
      duration: 2000,
      gravity: "top",
      position: "right",
      offset: { x: 20, y: 150 },
      style: {
        background: "black",
      },
    }).showToast();

    contador = 1;
    spanContador.innerText = contador;

    actualizarNumerito();
  });

  function actualizarNumerito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const numerito = document.querySelector("#numerito");
    if (numerito) {
      numerito.innerText = totalCantidad;
    }
  }

  actualizarNumerito(); // Actualiza al cargar
});
