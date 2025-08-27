document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('createProductForm');

  form.addEventListener('submit', async function (event) {
    if (!formValidation()) {
      event.preventDefault();
      return;
    }
  });

  function formValidation() {
    let valid = true;

    const inputName = document.getElementById('name');
    const price = document.getElementById('price');
    const stock = document.getElementById('stock');
    const category = document.getElementById('category');
    const size = document.getElementById('size');
    const inputFiles = document.getElementById('images');
    const description = document.getElementById('description');

    const errName = document.getElementById('errorName');
    const errPrice = document.getElementById('errorPrice');
    const errStock = document.getElementById('errorStock');
    const errCategory = document.getElementById('errorCategory');
    const errSize = document.getElementById('errorSize');
    const errImages = document.getElementById('errorImages');
    const errDescription = document.getElementById('errorDescription');

    if (!inputName.value.trim()) {
      errName.textContent = 'Campo incompleto';
      valid = false;
    } else if (inputName.value.trim().length < 5) {
      errName.textContent = 'El nombre debe tener al menos 5 caracteres';
      valid = false;
    } else {
      errName.textContent = '';
    }

    if (price.value === '' || Number(price.value) <= 0) {
      errPrice.textContent = 'Precio inválido';
      valid = false;
    } else {
      errPrice.textContent = '';
    }

    if (stock.value === '' || Number(stock.value) < 0) {
      errStock.textContent = 'Stock inválido';
      valid = false;
    } else {
      errStock.textContent = '';
    }

    if (!category.value) {
      errCategory.textContent = 'Categoría requerida';
      valid = false;
    } else {
      errCategory.textContent = '';
    }

    if (!size.value) {
      errSize.textContent = 'Talle requerido';
      valid = false;
    } else {
      errSize.textContent = '';
    }

    const files = Array.from(inputFiles.files);
    if (files.length < 1) {
      errImages.textContent = 'Se debe seleccionar al menos una imagen.';
      valid = false;
    } else {
      const allowed = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/gif']);
      const bad = files.find(f => !allowed.has(f.type));
      if (bad) {
        errImages.textContent = 'Formato de imagen no válido. Solo JPG, JPEG, PNG y GIF.';
        valid = false;
      } else {
        errImages.textContent = '';
      }
    }

    const desc = description.value.trim();
    if (!desc) {
      errDescription.textContent = 'Campo incompleto';
      valid = false;
    } else if (desc.length < 20) {
      errDescription.textContent = 'La descripción debe tener al menos 20 caracteres';
      valid = false;
    } else {
      errDescription.textContent = '';
    }

    return valid;
  }
});
