let db = require('../database/models');

const cartController = {
  carrito: function (req, res, next) {
    return res.render('products/cart', { title: 'Superlative | Carrito' });
  },

  agregar: async function (req, res, next) {
    let cart = req.cookies.carrito ? JSON.parse(req.cookies.carrito) : [];
    const productoAgregado = await db.Products.findByPk(req.params.id, {
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

    const existingProduct = cart.find(product => product.id == req.params.id);

    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      const addedProduct = {
        id: productoAgregado.id,
        title: productoAgregado.title,
        price: productoAgregado.price,
        img: productoAgregado.img,
        cantidad: 1,
      };
      cart.push(addedProduct);
    }

    res.cookie('carrito', JSON.stringify(cart), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect('/productos');
  },

  comprar: async function (req, res, next) {
    try {
      let cart = req.cookies.carrito ? JSON.parse(req.cookies.carrito) : [];

      const order = await db.Orders.create({
        dateCreate: new Date(),
        user: req.session.lastUser.id || '',
        total: cart.reduce((acc, product) => acc + product.price * product.cantidad, 0),
        items: cart.reduce((acc, prenda) => acc + prenda.cantidad, 0),
      });
      for (const product of cart) {
        await db.OrdersDetails.create({
          orders: order.id,
          product: product.id,
        });
      }

      res.clearCookie('carrito');
      res.redirect('/');
    } catch (error) {
      console.error('Error al crear la orden:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },

  eliminar: function (req, res, next) {
    res.clearCookie('carrito');
    return res.redirect('/');
  },
};

module.exports = cartController;
