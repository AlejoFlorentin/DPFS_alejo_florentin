let db = require('../database/models');

const indexController = {
  index: async function (req, res) {
    try {
      const products = await db.Product.findAll({
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

      const featured = products.sort(() => 0.5 - Math.random()).slice(0, 8);

      return res.render('index', {
        featured,
      });
    } catch (error) {
      console.error('Error al leer productos:', error);
      return res.status(500).send('Error al cargar productos');
    }
  },
  faq: function (req, res) {
    return res.render('faq');
  },
  us: function (req, res) {
    return res.render('us');
  },
};

module.exports = indexController;
