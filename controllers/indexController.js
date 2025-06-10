const fs = require('fs').promises;
const path = require('path');
let db = require('../database/models');

const indexController = {
  index: async function (req, res) {
    try {
      const products = await db.Products.findAll();

      // Mezclar productos y tomar los primeros 8
      const destacados = products.sort(() => 0.5 - Math.random()).slice(0, 8);

      return res.render('index', {
        title: 'Superlative',
        destacados,
      });
    } catch (error) {
      console.error('Error al leer productos:', error);
      return res.status(500).send('Error al cargar productos');
    }
  },
  faq: function (req, res) {
    return res.render('faq', { title: 'Superlative | Faq' });
  },
  us: function (req, res) {
    return res.render('us', { title: 'Superlative | Nosotros' });
  },
};

module.exports = indexController;
