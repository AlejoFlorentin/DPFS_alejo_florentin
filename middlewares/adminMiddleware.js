module.exports = (req, res, next) => {
  if (req.session.lastUser && req.session.lastUser.category === "admin") {
    return next();
  }

  return res.redirect("/");
};
