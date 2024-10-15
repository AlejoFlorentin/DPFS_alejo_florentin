let clothes = [];

// Cargar los datos de las prendas
fetch('/public/js/prendas.json')
  .then(res => res.json())
  .then(data => {
    clothes = data;

    if (categorySelected) {
      showProductsCategoriesIndex(clothes);
    } else {
      showproducts(clothes);
    }
  });

// Mostrar productos en el DOM
function showproducts(products) {
  productsFiltered.innerHTML = ''; // Limpiar productos previos

  products.forEach(product => {
    const article = document.createElement('article');
    article.classList.add('product');
    article.innerHTML = `
      <a href="./productDetail.html">   
        <img src="${product.img}" alt="${product.title}">
        <div class="productInfo">
          <h4>${product.title}</h4>
          <div class="productPrice">
            <p>$ ${product.price}</p>
            <p class="cuotas"><b>3 cuotas sin interes de $ ${Math.round(product.price / 3).toFixed(
              2
            )} </b></p>    
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
  addEventToButtons();
}

let carrito = [];
// Agregar eventos de clic a los botones de "Agregar al carrito"
function addEventToButtons() {
  let btnAddProduct = document.querySelectorAll('.btnAddProduct'); // Seleccionar todos los botones

  btnAddProduct.forEach(button => {
    button.addEventListener('click', addProduct); // Llamar a la función para agregar producto;
  });

  // Función para manejar el clic en el botón de agregar producto
  function addProduct(e) {
    const productId = e.target.id; // Obtener el ID del producto
    console.log('Producto agregado con ID:', productId);
  }
}

const productsFiltered = document.getElementById('productsFiltered');
const categorySelected = localStorage.getItem('categorySelected');

// Mostrar productos filtrados por categoría
function showProductsCategoriesIndex(products) {
  const filteredProducts = products.filter(product => product.category === categorySelected);
  showproducts(filteredProducts);
  localStorage.removeItem('categorySelected');
}

const checkCategory = document.querySelectorAll('.checkCategory');

// Manejar el cambio de categoría por checkbox
checkCategory.forEach(check => check.addEventListener('change', applyFilter));

function applyFilter(e) {
  let allProducts = clothes;

  const clickedCheckbox = e.currentTarget;

  // Deseleccionar otros checkboxes
  checkCategory.forEach(check => {
    if (check !== clickedCheckbox) {
      check.checked = false;
    }
  });

  productsFiltered.innerHTML = '';

  const selectedCategory = [...checkCategory].filter(checkbox => checkbox.checked);
  const mapedCategory = selectedCategory.map(checkbox => checkbox.id);

  if (mapedCategory.length === 0) {
    showproducts(allProducts);
    return;
  }

  const productFilter = allProducts.filter(product => mapedCategory.includes(product.category));
  showproducts(productFilter);
}
