let cart = JSON.parse(localStorage.getItem('carrito') || []);

const productsCart = document.querySelector('.productsCart');
const CartProductsTotal = document.querySelector('.cartProductsTotal');
const noProduct = document.querySelector('.noProduct');
const tot = document.querySelector('#totalBuy');
const cantProd = document.querySelector('#cantidad');
const envio = document.querySelector('#shipment');
const cartDelete = document.querySelector('#deleteCart');
const cartBuy = document.querySelector('#buyCart');

function loadCartProducts() {
  if (cart && cart.length > 0) {
    productsCart.innerHTML = '';
    noProduct.style.display = 'none';

    // Crear los productos del carrito en el DOM
    cart.forEach(product => {
      const article = document.createElement('article');
      article.classList.add('productCart');

      article.innerHTML = `
        <img src="${product.img}" alt="${product.title}" />
        <div class="d-flex flex-row justify-content-evenly align-items-center w-100">
          <div>
            <p>Cantidad</p>
            <p class="text-center">${product.cantidad}</p>
          </div>
          <div>
            <p>Precio</p>
            <p>$ ${product.price}</p>
          </div>
          <div class="subtotal">
            <p>Subtotal</p>
            <p>$ ${product.price * product.cantidad}</p>
          </div>
        </div>
        <i id="${product.id}" class="deleteBtn bx bxs-trash-alt"></i>
      `;

      productsCart.append(article);
    });

    // Actualizar la variable `deleteBtns` después de que los elementos se hayan creado en el DOM
    let deleteBtns = document.querySelectorAll('.deleteBtn');

    // Llamar a la función para agregar los eventos de eliminar
    deleteItem(deleteBtns);
    resume();
  } else {
    noProduct.style.display = 'block';
    CartProductsTotal.style.display = 'none';
    productsCart.style.display = 'none';
  }
}

// Cargar los productos del carrito
loadCartProducts();

// Función para eliminar productos
function deleteItem(deleteBtns) {
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', deleteProduct);
  });

  function deleteProduct(e) {
    Toastify({
      text: 'Producto Eliminado',
      duration: 2000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      offset: {
        x: 20, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 150, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'black',
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    const btnId = e.target.id;

    // Filtrar todos los productos diferentes al id del btn eliminar y devuelve un array con ellos
    cart = cart.filter(product => product.id !== btnId);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(cart));

    // Recargar los productos del carrito
    loadCartProducts();

    console.log('Producto ' + btnId + ' eliminado');
  }
}

function resume() {
  const total = cart.reduce((acc, prenda) => acc + prenda.price * prenda.cantidad, 0);
  const cantidad = cart.reduce((acc, prenda) => acc + prenda.cantidad, 0);
  if (total >= 65000) {
    envio.innerHTML = 'Gratis';
  } else {
    envio.innerHTML = `$ ${5000}`;
  }

  tot.innerHTML = `$ ${total}`;
  cantProd.innerHTML = cantidad;
}

cartDelete.addEventListener('click', deleteCart);

function deleteCart() {
  cart.length = 0;
  localStorage.setItem('carrito', JSON.stringify(cart));
  loadCartProducts();
}

cartBuy.addEventListener('click', buy);

function buy() {
  cart.length = 0;
  localStorage.setItem('carrito', JSON.stringify(cart));
  loadCartProducts();
}
