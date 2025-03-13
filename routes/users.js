var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  res.render("users/login", { title: "Superlative | Login" });
});

router.get("/registro", function (req, res, next) {
  res.render("users/register", { title: "Superlative | Registro" });
});

module.exports = router;
