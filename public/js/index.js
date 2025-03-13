let clothesIndex = [];

fetch("/js/prendas.json")
  .then((res) => res.json())
  .then((data) => {
    clothesIndex = data;
    showSomeProducts(clothesIndex);
  });

const productsContainer = document.getElementById("productsContainer");

function showSomeProducts(clothesSelected) {
  const shuffledClothes = [...clothesSelected].sort(() => 0.5 - Math.random()); // Aquie mezclamos el array clothes
  console.log(shuffledClothes);
  const randomClothes = shuffledClothes.slice(0, 8); // Tomamos solo 10 prendas del array mezclado con .slice

  randomClothes.forEach((cloth) => {
    const article = document.createElement("article");
    article.classList.add("product");
    article.classList.add("col-lg-3");
    article.classList.add("col-md-4");
    article.classList.add("col-sm-6");
    article.innerHTML = `
                            <a class='text-black text-decoration-none' href="/productos/detalle/${
                              cloth.id
                            }">   
                                <img  src="${cloth.img}" alt="${cloth.title}">
                                <div class="d-flex flex-column align-items-center justify-content-center">
                                    <h4 class='text-center'>${cloth.title}</h4>
                                    <div class="d-flex flex-column align-items-center">
                                        <p>$ ${cloth.price}</p>
                                        <p class="border border-danger border-2 p-1 text-danger text-center"><b>3 cuotas sin interes de $ ${Math.round(
                                          cloth.price / 3
                                        ).toFixed(2)} </b></p>    
                                    </div>
                                </div>
                             </a>
                            `;
    productsContainer.append(article);
  });
}

const categories = document.querySelectorAll(".category");

categories.forEach((category) => {
  category.addEventListener("click", (e) => {
    const categorySelected = e.currentTarget.id;
    localStorage.setItem("categorySelected", categorySelected);
  });
});
