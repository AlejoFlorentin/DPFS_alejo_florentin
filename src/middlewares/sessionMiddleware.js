let db = require("../database/models");
module.exports = async (req, res, next) => {
  if (!req.session.lastUser && req.cookies.recordame) {
    const userId = parseInt(req.cookies.recordame, 10);
    const user = await db.Users.findByPk(userId, {
      include: [{ association: "UserCategory", attributes: ["name"] }],
    });
    console.log("🔎 Usuario encontrado por cookie:", user);
    if (user) {
      req.session.lastUser = {
        id: user.id,
        name: user.firstName,
        email: user.email,
        category: user.UserCategory.name,
        image: user.image,
      };
    }
  }
  if (req.session.lastUser !== undefined) {
    res.locals.lastUser = req.session.lastUser; // para poder usar los datos en todas las vistas
  }
  next();
};
