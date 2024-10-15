const openMenuBtns = document.querySelectorAll('.menuBtn');
const navs = document.querySelectorAll('nav');
const closeMenuBtns = document.querySelectorAll('.exitMenu');

openMenuBtns.forEach((btn, index) =>
  btn.addEventListener('click', function openMenu() {
    navs[index].style.display = 'block';
  })
);

closeMenuBtns.forEach((btn, index) =>
  btn.addEventListener('click', function openMenu() {
    navs[index].style.display = 'none';
  })
);
