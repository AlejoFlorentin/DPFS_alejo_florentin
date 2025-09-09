let db = require('../../database/models');

const productsApiController = {
  getAll: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        attributes: { exclude: ['created_at', 'updated_at', 'category_id'] },
        include: [
          { association: 'images', attributes: ['url'] },
          { association: 'category', attributes: ['name'] },
          { association: 'sizes', attributes: ['size'], through: { attributes: [] } },
        ],
      });
      const countByCategory = {};
      products.forEach(product => {
        const category = product.category.name;
        countByCategory[category] = (countByCategory[category] || 0) + 1;
      });
      return res
        .status(200)
        .json({ count: products.length, countByCategory: countByCategory, products: products });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        attributes: { exclude: ['category_id'] },
        include: [
          { association: 'images', attributes: ['url'] },
          { association: 'category', attributes: ['name'] },
          { association: 'sizes', attributes: ['size'], through: { attributes: [] } },
        ],
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found', status: 404 });
      }
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productsApiController;
