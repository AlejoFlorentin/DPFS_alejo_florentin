let db = require('../database/models');

const cartController = {
  carrito: function (req, res, next) {
    return res.render('products/cart', {
      title: 'Superlative | Carrito',
      css: 'cart.css',
    });
  },

  agregarDetalle: async function (req, res, next) {
    let cart = req.cookies.carrito ? JSON.parse(req.cookies.carrito) : [];
    let contador = Number(req.body.contador);
    const productoAgregado = await db.Product.findByPk(req.params.id, {
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
      existingProduct.cantidad += contador;
    } else {
      const addedProduct = {
        id: productoAgregado.id,
        title: productoAgregado.title,
        price: productoAgregado.price,
        img: productoAgregado.images[0].url,
        cantidad: contador,
      };
      cart.push(addedProduct);
    }

    res.cookie('carrito', JSON.stringify(cart), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect(`/productos/detalle/${req.params.id}`);
  },

  comprar: async function (req, res, next) {
    try {
      let cart = req.cookies.carrito ? JSON.parse(req.cookies.carrito) : [];

      const order = await db.Order.create({
        user_id: req.session.lastUser?.id || null,
        total: cart.reduce((acc, product) => acc + product.price * product.cantidad, 0),
        items: cart.reduce((acc, prenda) => acc + prenda.cantidad, 0),
      });
      for (const product of cart) {
        // Crear el detalle de la orden
        await db.OrderDetail.create({
          order_id: order.id,
          product_id: product.id,
        });

        // Restar stock del producto
        const productoDB = await db.Product.findByPk(product.id);
        await db.Product.update(
          { stock: productoDB.stock - product.cantidad },
          { where: { id: product.id } }
        );
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

  eliminarItem: function (req, res, next) {
    let cart = req.cookies.carrito ? JSON.parse(req.cookies.carrito) : [];
    const products = cart.filter(p => p.id != req.params.id);
    res.clearCookie('carrito');
    res.cookie('carrito', JSON.stringify(products), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.redirect('/carrito');
  },
};

module.exports = cartController;
