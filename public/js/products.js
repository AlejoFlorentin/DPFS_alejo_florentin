
let cart;

// Cargar carrito desde localStorage
let productsCartLS = localStorage.getItem("carrito");
if (productsCartLS) {
  cart = JSON.parse(productsCartLS);
  actualizarNumerito();
} else {
  cart = [];
}

// Función para actualizar numerito del carrito
function actualizarNumerito() {
  let nuevoNumerito = cart.reduce((acc, prenda) => acc + prenda.cantidad, 0);
  const numerito = document.querySelector("#numerito");
  if (numerito) {
    numerito.innerHTML = nuevoNumerito;
  }
}

// Agregar eventos de clic a los botones de "Agregar al carrito"
document.addEventListener("DOMContentLoaded", () => {
  let btnAddProduct = document.querySelectorAll(".btnAddProduct");

  btnAddProduct.forEach((button) => {
    button.addEventListener("click", addProduct);
  });

  function addProduct(e) {
    Toastify({
      text: "Producto Agregado",
      duration: 2000,
      gravity: "top",
      position: "right",
      offset: {
        x: 20,
        y: 150,
      },
      stopOnFocus: true,
      style: {
        background: "black",
      },
    }).showToast();

    const idBtn = e.target.id;
    const title = e.target.closest("article").querySelector("h4").textContent;
    const price = parseFloat(
      e.target.closest("article").querySelector("p").textContent.replace("$", "")
    );
    const img = e.target.closest("article").querySelector("img").src;

    const addedProduct = {
      id: idBtn,
      title,
      price,
      img,
      cantidad: 1,
    };

    const existingProduct = cart.find((product) => product.id === idBtn);

    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      cart.push(addedProduct);
    }

    localStorage.setItem("carrito", JSON.stringify(cart));
    actualizarNumerito();
  }
});
