var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("products/product", { title: "Superlative | Productos" });
});

router.get("/carrito", function (req, res, next) {
  res.render("products/cart", { title: "Superlative | Carrito" });
});

router.get("/detalle", function (req, res, next) {
  res.render("products/productDetail", { title: "Superlative | Detalle" });
});

module.exports = router;
