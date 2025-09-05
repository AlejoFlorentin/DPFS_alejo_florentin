module.exports = (req, res, next) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);

  res.locals.cart = cart;
  res.locals.cartQuantity = totalQuantity;
  next();
};
