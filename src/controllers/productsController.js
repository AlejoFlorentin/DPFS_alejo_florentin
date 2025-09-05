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
        product,
      });
    } catch (error) {
      console.error('Error leyendo el archivo de productos:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },
  crear: function (req, res, next) {
    return res.render('products/createProduct');
  },

  productos: async function (req, res, next) {
    try {
      const category = req.query.category;

      let products;

      if (category) {
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
          where: { '$category.name$': category },
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

      function formatNumber(number) {
        let parts = number.toString().split('.');
        let wholePart = parts[0];
        let decimalPart = parts.length > 1 ? parts[1] : '';

        wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        let formattedNumber = '$ ' + wholePart;
        if (decimalPart !== '') {
          formattedNumber += ',' + decimalPart;
        }

        return formattedNumber;
      }

      return res.render('products/product', {
        products,
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
        product: product,
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
        return res.render('products/createProduct', {
          errors: errors.mapped(),
        });
      }
      const category = await db.ProductCategorie.findOne({
        where: { name: req.body.category },
      });

      const size = await db.Size.findOne({
        where: { size: req.body.size },
      });

      const newProduct = {
        title: req.body.name,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        category_id: category.id,
        description: req.body.description,
      };

      const createdProduct = await db.Product.create(newProduct);

      const imgsToInsert = req.files.map(f => ({
        url: `/img/products/${req.body.category}/${f.filename}`,
        product_id: createdProduct.id,
      }));
      await db.ProductImg.bulkCreate(imgsToInsert);

      await db.ProductSize.create({
        product_id: createdProduct.id,
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let id = req.params.id;
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
        return res.render('products/editProduct', {
          errors: errors.mapped(),
          product,
        });
      }

      const category = await db.ProductCategorie.findOne({
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
          category_id: category.id,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      const imgsToInsert = req.files.map(f => ({
        url: `/img/products/${req.body.category}/${f.filename}`,
        product_id: product.id,
      }));
      await db.ProductImg.bulkCreate(imgsToInsert);

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
