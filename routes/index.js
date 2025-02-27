var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Superlative" });
});

router.get("/faq", function (req, res) {
  res.render("faq", { title: "Superlative | Faq" });
});

router.get("/us", function (req, res) {
  res.render("us", { title: "Superlative | Nosotros" });
});

module.exports = router;
