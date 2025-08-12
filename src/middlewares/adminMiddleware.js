module.exports = (req, res, next) => {
  if (req.session.lastUser && req.session.lastUser.category === 'Admin') {
    return next();
  }

  return res.redirect('/');
};
