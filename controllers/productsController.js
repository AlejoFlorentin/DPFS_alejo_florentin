const fs = require('fs').promises;
const path = require('path');
let db = require('../database/models');

const productsController = {
  editar: async function (req, res, next) {
    let id = req.params.id;
    try {
      let product = await db.Products.findByPk(id, {
        include: [
          {
            association: 'ProductCategory',
            attributes: ['name'],
          },
          {
            association: 'sizes',
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          },
        ],
      });
      console.log('Producto encontrado:', product);
      return res.render('products/editProduct', {
        title: 'Superlative',
        product,
      });
    } catch (error) {
      console.error('Error leyendo el archivo de productos:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },
  crear: function (req, res, next) {
    return res.render('products/createProduct', { title: 'Superlative' });
  },

  productos: async function (req, res, next) {
    try {
      const categoria = req.query.categoria;

      let products;

      // Si hay categoría, filtrar
      if (categoria) {
        products = await db.Products.findAll({
          include: [
            {
              association: 'ProductCategory',
            },
          ],
          where: { '$ProductCategory.name$': categoria },
        });
      } else {
        products = await db.Products.findAll();
      }

      function formatNumber(numero) {
        let partes = numero.toString().split('.');
        let parteEntera = partes[0];
        let parteDecimal = partes.length > 1 ? partes[1] : '';

        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        let numeroFormateado = '$ ' + parteEntera;
        if (parteDecimal !== '') {
          numeroFormateado += ',' + parteDecimal;
        }

        return numeroFormateado;
      }

      return res.render('products/product', {
        title: 'Superlative | Productos',
        products,
        req,
        formatNumber,
      });
    } catch (error) {
      console.error('Error leyendo los productos:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },

  carrito: function (req, res, next) {
    return res.render('products/cart', { title: 'Superlative | Carrito' });
  },
  detalle: async function (req, res, next) {
    try {
      let product;

      product = await db.Products.findByPk(req.params.id, {
        include: [
          {
            association: 'sizes',
            through: { attributes: [] },
          },
        ],
      });
      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      return res.render('products/productDetail', {
        title: 'Superlative | Detalle',
        producto: product,
      });
    } catch (err) {
      console.error('Error leyendo el archivo JSON:', err);
      return res.status(500).send('Error interno del servidor');
    }
  },
  dataNew: async function (req, res, next) {
    try {
      const filePath = path.join(__dirname, '../data/products.json');
      const data = await fs.readFile(filePath, 'utf8');
      const products = JSON.parse(data);

      const lastId = products.length > 0 ? parseInt(products[products.length - 1].id) : 0;

      const nuevoProducto = {
        id: (lastId + 1).toString(),
        title: req.body.name,
        price: parseFloat(req.body.price),
        size: req.body.size,
        stock: parseInt(req.body.stock),
        category: req.body.category,
        img: `/img/products/${req.body.category}/${req.file.filename}`,
        description: req.body.description,
      };

      products.push(nuevoProducto);

      await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');

      return res.redirect('/productos');
    } catch (error) {
      console.error('Error al crear producto:', error);
      return res.status(500).send('Error al guardar el producto');
    }
  },

  dataEdit: async function (req, res, next) {
    try {
      const filePath = path.join(__dirname, '../data/products.json');
      const data = await fs.readFile(filePath, 'utf8');
      let products = JSON.parse(data);

      const id = req.params.id;
      const index = products.findIndex(product => product.id == id);

      if (index === -1) {
        return res.status(404).send('Producto no encontrado');
      }

      // Actualizamos los campos
      products[index].title = req.body.name;
      products[index].price = parseFloat(req.body.price);
      products[index].size = req.body.size;
      products[index].stock = parseInt(req.body.stock);
      products[index].category = req.body.category;
      products[index].img = `/img/products/${req.body.category}/${req.file.filename}`;
      products[index].description = req.body.description;

      // Si más adelante sumás imagen, también podrías actualizarla acá.

      await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');

      return res.redirect('/productos');
    } catch (err) {
      console.error('Error al editar producto:', err);
      return res.status(500).send('Error al editar producto');
    }
  },

  delete: async function (req, res) {
    try {
      const filePath = path.join(__dirname, '../data/products.json');
      const data = await fs.readFile(filePath, 'utf8');
      let products = JSON.parse(data);

      const id = req.params.id;
      products = products.filter(product => product.id !== id);

      await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');

      return res.redirect('/productos');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).send('Error al eliminar producto');
    }
  },
};

module.exports = productsController;
