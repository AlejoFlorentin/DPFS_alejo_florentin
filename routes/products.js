var express = require("express");
var router = express.Router();

router.get("/cart", function (req, res, next) {
  res.render("products/cart", { title: "Superlative | Carrito" });
});

router.get("/", function (req, res, next) {
  res.render("products/product", { title: "Superlative | Productos" });
});

router.get("/detail", function (req, res, next) {
  res.render("products/productDetail", { title: "Superlative | Detalle" });
});

module.exports = router;
