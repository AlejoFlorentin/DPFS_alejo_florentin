module.exports = (req, res, next) => {
  if (!req.session.lastUser) {
    return res.redirect("/usuarios/login");
  }
  next();
};
