module.exports = (req, res, next) => {
  const carrito = req.cookies.carrito ? JSON.parse(req.cookies.carrito) : [];
  const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  res.locals.carrito = carrito;
  res.locals.carritoCantidad = cantidadTotal;
  next();
};
