let db = require('../database/models');
module.exports = async (req, res, next) => {
  if (!req.session.lastUser && req.cookies.recordame) {
    const userId = parseInt(req.cookies.recordame, 10);
    const user = await db.User.findByPk(userId, {
      exclude: ['password', 'createdAt', 'updatedAt', 'category_id'],
      include: [
        { association: 'category', attributes: ['name'] },
        { association: 'image', attributes: ['url'] },
      ],
    });
    console.log('🔎 Usuario encontrado por cookie:', user);
    if (user) {
      req.session.lastUser = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        category: user.category.name,
        image: user.image?.url || '/img/users/default.jpg',
      };
    }
  }
  if (req.session.lastUser !== undefined) {
    res.locals.lastUser = req.session.lastUser; // para poder usar los datos en todas las vistas
  }
  next();
};
