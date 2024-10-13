const openMenuBtns = document.querySelectorAll ('.menuBtn');
const navs = document.querySelectorAll ('nav');
const closeMenuBtns = document.querySelectorAll ('.exitMenu')

openMenuBtns.forEach((btn , index) => btn.addEventListener('click' ,function openMenu () {
    navs[index].style.display = "block";
} ) );

closeMenuBtns.forEach((btn , index) => btn.addEventListener('click' ,function openMenu () {
    navs[index].style.display = "none";
} ) );

const filterBtn = document.getElementById('#filterBtn')
const filter = document.getElementById('#filter')
const filterExitBtn = document.getElementById ('#exitBtn')

filterBtn.addEventListener('click' , openFilter)

function openFilter () {
    filter.style.display = "block";
}

filterExitBtn.addEventListener('click' , closeFilter)

function closeFilter () {
    filter.style.display = "none";
}





