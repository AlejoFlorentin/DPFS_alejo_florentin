let clothes = []



fetch('/public/js/prendas.json')
.then(res => res.json())
.then(data => {
    clothes = data
    
    if (categorySelected) {
        showProductsCategoriesIndex(clothes)

    } else {
        showproducts(clothes)
    }

})


function showproducts (products) {

    products.forEach(product => {
        const article = document.createElement('article')
        article.classList.add('product')
        article.innerHTML = `
                            <a href="./productDetail.html">   
                                <img src="${product.img}" alt="${product.title}">
                                <div class="productInfo">
                                    <h4>${product.title}</h4>
                                    <div class="productPrice">
                                        <p>$ ${product.price}</p>
                                        <p class="cuotas"><b>3 cuotas sin interes de $ ${Math.round(product.price/3).toFixed(2)} </b></p>    
                                    </div>
                                </div>
                             </a>
                            `
        productsFiltered.append(article)
    })

}


const productsFiltered = document.getElementById('productsFiltered')

const categorySelected = localStorage.getItem('categorySelected');

// Funcion para mostrar los productos cuando selecciono por categoria en la pagina INDEX
function showProductsCategoriesIndex(products) {
    
    const filteredProducts = products.filter(product => product.category === categorySelected);
    
    showproducts(filteredProducts)

    localStorage.removeItem('categorySelected')
}


const checkCategory = document.querySelectorAll('.checkCategory')


//Funcion para mostrar los productos del checkbox

checkCategory.forEach(check => check.addEventListener('change',applyFilter))

    
function applyFilter(e) {
     
    let allProducts = clothes;

    //Filtrar por categoria
    const clickedCheckbox = e.currentTarget; // Checkbox que fue clicado

    checkCategory.forEach(check => {
        if (check !== clickedCheckbox) {    //Condicional para que cuando hay un check seleccionado se deseleccione los otros
            check.checked = false;
        }
    });

    productsFiltered.innerHTML = "";   

    // Obtenemos los IDs de los checkbox seleccionados y los almacenamos en un array
    const selectedCategory = [...checkCategory].filter(checkbox => checkbox.checked)
    console.log(selectedCategory)
    const mapedCategory = selectedCategory.map(checkbox => checkbox.id);
    console.log(mapedCategory)
    // Si no hay ninguna categoría seleccionada, muestra todos los productos
    if (mapedCategory.length === 0) {
        showproducts(allProducts);
        return;
    }

    // Filtra los productos basados en las categorías seleccionadas
    const productFilter = allProducts.filter(product => 
        mapedCategory.includes(product.category)
    );

    // Muestra los productos filtrados
    showproducts(productFilter);

    
}





   
