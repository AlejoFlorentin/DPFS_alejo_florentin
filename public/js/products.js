let clothes = [];

// Cargar los datos de las prendas
fetch("/js/prendas.json")
  .then((res) => res.json())
  .then((data) => {
    clothes = data;

    if (categorySelected) {
      showProductsCategoriesIndex(clothes);
    } else {
      showproducts(clothes);
    }
  });
const numerito = document.querySelector("#numerito");
const checkCategory = document.querySelectorAll(".checkCategory");
// Mostrar productos en el DOM
function showproducts(products) {
  productsFiltered.innerHTML = ""; // Limpiar productos previos

  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product");
    article.classList.add("col-lg-3");
    article.classList.add("col-md-4");
    article.classList.add("col-sm-6");
    article.innerHTML = `
      <a class="d-flex flex-column align-items-center justify-content-center text-decoration-none text-black" href="/productos/detalle/${
        product.id
      }">   
        <img src="${product.img}" alt="${product.title}">
        <div>
          <h4 class="text-center">${product.title}</h4>
          <div class="d-flex flex-column align-items-center">
            <p>$ ${product.price}</p>
            <p class="cuotas"><b>3 cuotas sin interes de $ ${Math.round(
              product.price / 3
            ).toFixed(2)} </b></p>    
          </div>
        </div>
      </a>
      <button class='btnAddProduct mb-5 rounded-2 border-0 fs-6 bg-black text-white p-2' id=${
        product.id
      }>Agregar al carrito</button>
    `;
    productsFiltered.append(article);
  });

  // Después de mostrar los productos, agregamos los eventos de clic a todos los botones "Agregar al carrito"
  btnAdds();
}

const productsFiltered = document.getElementById("productsFiltered");
const categorySelected = localStorage.getItem("categorySelected");

// Mostrar productos filtrados por categoría
function showProductsCategoriesIndex(products) {
  const filteredProducts = products.filter(
    (product) => product.category === categorySelected
  );
  showproducts(filteredProducts);
  localStorage.removeItem("categorySelected");
}

// Manejar el cambio de categoría por checkbox

checkCategory.forEach((check) => check.addEventListener("change", applyFilter));

function applyFilter(e) {
  let allProducts = clothes;

  const clickedCheckbox = e.currentTarget;

  // Deseleccionar otros checkboxes
  checkCategory.forEach((check) => {
    if (check !== clickedCheckbox) {
      check.checked = false;
    }
  });

  productsFiltered.innerHTML = "";

  const selectedCategory = [...checkCategory].filter(
    (checkbox) => checkbox.checked
  );
  const mapedCategory = selectedCategory.map((checkbox) => checkbox.id);

  if (mapedCategory.length === 0) {
    showproducts(allProducts);
    return;
  }

  const productFilter = allProducts.filter((product) =>
    mapedCategory.includes(product.category)
  );
  showproducts(productFilter);
}

let cart;

//Esto sirve por si elimine algun producto en la parte de carrito traerme el carrito actualizado y asi modificar
let productsCartLS = localStorage.getItem("carrito");
if (productsCartLS) {
  cart = JSON.parse(productsCartLS); //j)Si hay productos guardado  parsearlos y guardarlos en carrito y luego actualizar el numerito
  actualizarNumerito();
} else {
  cart = []; //k)Sino dejarlo vacio y no actualizar
}
// Agregar eventos de clic a los botones de "Agregar al carrito"
function btnAdds() {
  let btnAddProduct = document.querySelectorAll(".btnAddProduct"); // Seleccionar todos los botones

  btnAddProduct.forEach((button) => {
    button.addEventListener("click", addProduct); // Llamar a la función para agregar producto;
  });

  // Función para manejar el clic en el botón de agregar producto
  function addProduct(e) {
    Toastify({
      text: "Producto Agregado",
      duration: 2000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      offset: {
        x: 20, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 150, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    const idBtn = e.target.id; // Obtener el ID del producto
    const addedProduct = clothes.find((product) => product.id === idBtn); // Encontrar el producto que se quiere agregar
    const searchProductCart = cart.some((product) => product.id === idBtn); // Se busca si existe el producto agregado en el carrito
    //Si la prenda existe  en el carrito
    if (searchProductCart) {
      const itemIndex = cart.findIndex((prenda) => prenda.id === idBtn); //Buscamos el index en el carrito q coincida con el id del btn agregar
      cart[itemIndex].cantidad++; //Le sumamos 1 en la cantidad
      console.log(cart);
    } else {
      //Si no existe el producto en el carrito
      addedProduct.cantidad = 1; // Le agregamos al producto agregado la propiedad cantidad con valor 1 por si desp se
      // se agrega un producto igual se sume solo la cantidad
      cart.push(addedProduct); // Lo agregamos al carrito
      console.log(cart);
    }
    actualizarNumerito();

    localStorage.setItem("carrito", JSON.stringify(cart)); //Se guardan los productos del carrito en el localstorage
  }
}

function actualizarNumerito() {
  let nuevoNumerito = cart.reduce((acc, prenda) => acc + prenda.cantidad, 0);

  numerito.innerHTML = nuevoNumerito;
}
const filterBtn = document.querySelector("#filterBtn");
const filter = document.querySelector("#filter");
const filterExitBtn = document.querySelector("#exitBtn");

filterBtn.addEventListener("click", openFilter);

function openFilter() {
  filter.style.display = "block";
}

filterExitBtn.addEventListener("click", closeFilter);

function closeFilter() {
  filter.style.display = "none";
}
