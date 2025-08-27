let db = require('../database/models');
const { validationResult } = require('express-validator');

const productsController = {
  editar: async function (req, res, next) {
    let id = req.params.id;
    try {
      let product = await db.Product.findByPk(id, {
        include: [
          {
            association: 'category',
            attributes: ['name'],
          },
          {
            association: 'sizes',
          },
        ],
      });
      console.log('Producto encontrado:', product);
      return res.render('products/editProduct', {
        title: 'Superlative',
        css: 'editProduct.css',
        product,
      });
    } catch (error) {
      console.error('Error leyendo el archivo de productos:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },
  crear: function (req, res, next) {
    return res.render('products/createProduct', {
      title: 'Superlative',
      css: 'createProduct.css',
    });
  },

  productos: async function (req, res, next) {
    try {
      const categoria = req.query.categoria;

      let products;

      // Si hay categoría, filtrar
      if (categoria) {
        products = await db.Product.findAll({
          include: [
            {
              association: 'category',
            },
            {
              association: 'images',
              attributes: ['url'],
            },
          ],
          where: { '$category.name$': categoria },
        });
      } else {
        products = await db.Product.findAll({
          attributes: {
            exclude: ['category_id'],
          },
          include: [
            {
              association: 'images',
              attributes: ['url'],
            },
          ],
        });
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
        css: 'products.css',
        req,
        formatNumber,
      });
    } catch (error) {
      console.error('Error leyendo los productos:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },
  detalle: async function (req, res, next) {
    try {
      let product;

      product = await db.Product.findByPk(req.params.id, {
        include: [
          {
            association: 'sizes',
          },
          {
            association: 'category',
            attributes: ['name'],
          },
          {
            association: 'images',
            attributes: ['url'],
          },
        ],
      });
      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      return res.render('products/productDetail', {
        title: 'Superlative | Detalle',
        css: 'productDetail.css',
        producto: product,
      });
    } catch (err) {
      console.error('Error leyendo el archivo JSON:', err);
      return res.status(500).send('Error interno del servidor');
    }
  },
  dataNew: async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('products/createProduct', {
          title: 'Superlative',
          css: 'createProduct.css',
          errors: errors.mapped(),
        });
      }
      const categoria = await db.ProductCategorie.findOne({
        where: { name: req.body.category },
      });

      const size = await db.Size.findOne({
        where: { size: req.body.size },
      });

      const nuevoProducto = {
        title: req.body.name,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        category_id: categoria.id,
        description: req.body.description,
      };

      const productoCreado = await db.Product.create(nuevoProducto);

      const imgsToInsert = req.files.map(f => ({
        url: `/img/products/${req.body.category}/${f.filename}`,
        product_id: productoCreado.id,
      }));
      await db.ProductImg.bulkCreate(imgsToInsert);

      await db.ProductSize.create({
        product_id: productoCreado.id,
        size_id: size.id,
      });

      return res.redirect('/productos');
    } catch (error) {
      console.error('Error al crear producto:', error);
      return res.status(500).send('Error al guardar el producto');
    }
  },

  dataEdit: async function (req, res, next) {
    try {
      const categoria = await db.ProductCategorie.findOne({
        where: { name: req.body.category },
      });
      const size = await db.Size.findOne({
        where: { size: req.body.size },
      });
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          {
            association: 'images',
            attributes: ['url'],
          },
        ],
      });

      await db.Product.update(
        {
          title: req.body.name,
          price: parseFloat(req.body.price),
          stock: parseInt(req.body.stock),
          category_id: categoria.id,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await db.ProductImg.update(
        {
          url: req.file
            ? `/img/products/${req.body.category}/${req.file.filename}`
            : product.images[0].url,
        },
        {
          where: {
            product_id: req.params.id,
          },
        }
      );

      await db.ProductSize.update(
        { size_id: size.id },
        {
          where: {
            product_id: req.params.id,
          },
        }
      );

      return res.redirect('/productos');
    } catch (err) {
      console.error('Error al editar producto:', err);
      return res.status(500).send('Error al editar producto');
    }
  },

  delete: async function (req, res) {
    try {
      await db.ProductSize.destroy({
        where: {
          product_id: req.params.id,
        },
      });
      await db.ProductImg.destroy({
        where: { product_id: req.params.id },
      });
      await db.Product.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect('/productos');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).send('Error al eliminar producto');
    }
  },
};

module.exports = productsController;
