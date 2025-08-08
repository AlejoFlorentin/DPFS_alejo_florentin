let db = require('../database/models');

const indexController = {
  index: async function (req, res) {
    try {
      const products = await db.ProductImg.findAll({
        include: [{ association: 'product', attributes: ['title', 'price', 'stock'] }],
      });
      console.log(products);
      // Mezclar productos y tomar los primeros 8
      const destacados = products.sort(() => 0.5 - Math.random()).slice(0, 8);

      return res.render('index', {
        title: 'Superlative',
        destacados,
        css: 'index.css',
      });
    } catch (error) {
      console.error('Error al leer productos:', error);
      return res.status(500).send('Error al cargar productos');
    }
  },
  faq: function (req, res) {
    return res.render('faq', { title: 'Superlative | Faq', css: 'faq.css' });
  },
  us: function (req, res) {
    return res.render('us', { title: 'Superlative | Nosotros', css: 'us.css' });
  },
};

module.exports = indexController;
