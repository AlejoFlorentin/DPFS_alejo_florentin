let clothes = [];

fetch('/public/js/prendas.json')
  .then(res => res.json())
  .then(data => {
    clothes = data;
    showSomeProducts(clothes);
  });

const productsContainer = document.getElementById('productsContainer');

function showSomeProducts(clothesSelected) {
  const shuffledClothes = [...clothesSelected].sort(() => 0.5 - Math.random()); // Aquie mezclamos el array clothes
  const randomClothes = shuffledClothes.slice(0, 8); // Tomamos solo 10 prendas del array mezclado con .slice

  randomClothes.forEach(cloth => {
    const article = document.createElement('article');
    article.classList.add('product');
    article.innerHTML = `
                            <a href="./productDetail.html">   
                                <img src="${cloth.img}" alt="${cloth.title}">
                                <div class="productInfo">
                                    <h4>${cloth.title}</h4>
                                    <div class="productPrice">
                                        <p>$ ${cloth.price}</p>
                                        <p class="cuotas"><b>3 cuotas sin interes de $ ${Math.round(
                                          cloth.price / 3
                                        ).toFixed(2)} </b></p>    
                                    </div>
                                </div>
                             </a>
                            `;
    productsContainer.append(article);
  });
}

const categories = document.querySelectorAll('.category');

categories.forEach(category => {
  category.addEventListener('click', e => {
    const categorySelected = e.currentTarget.id;
    localStorage.setItem('categorySelected', categorySelected);
  });
});
