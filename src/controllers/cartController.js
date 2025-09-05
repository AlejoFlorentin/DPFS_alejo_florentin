let db = require('../database/models');

const cartController = {
  carrito: function (req, res, next) {
    return res.render('products/cart');
  },

  agregarDetalle: async function (req, res, next) {
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    let counter = Number(req.body.counter);
    const product = await db.Product.findByPk(req.params.id, {
      include: [
        {
          association: 'category',
          attributes: ['name'],
        },
        {
          association: 'images',
          attributes: ['url'],
        },
        {
          association: 'sizes',
        },
      ],
    });

    const existingProduct = cart.find(product => product.id == req.params.id);

    if (existingProduct) {
      existingProduct.quantity += counter;
    } else {
      const addedProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.images[0].url,
        quantity: counter,
      };
      cart.push(addedProduct);
    }

    res.cookie('cart', JSON.stringify(cart), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect(`/productos/detalle/${req.params.id}`);
  },

  comprar: async function (req, res, next) {
    try {
      let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

      const order = await db.Order.create({
        user_id: req.session.lastUser?.id || null,
        total: cart.reduce((acc, product) => acc + product.price * product.quantity, 0),
        items: cart.reduce((acc, item) => acc + item.quantity, 0),
      });
      for (const product of cart) {
        await db.OrderDetail.create({
          order_id: order.id,
          product_id: product.id,
        });

        const productDB = await db.Product.findByPk(product.id);
        await db.Product.update(
          { stock: productDB.stock - product.quantity },
          { where: { id: product.id } }
        );
      }

      res.clearCookie('cart');
      res.redirect('/');
    } catch (error) {
      console.error('Error al crear la orden:', error);
      return res.status(500).send('Error interno del servidor');
    }
  },

  eliminar: function (req, res, next) {
    res.clearCookie('cart');
    return res.redirect('/');
  },

  eliminarItem: function (req, res, next) {
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    const products = cart.filter(p => p.id != req.params.id);
    res.clearCookie('cart');
    res.cookie('cart', JSON.stringify(products), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.redirect('/carrito');
  },
};

module.exports = cartController;
