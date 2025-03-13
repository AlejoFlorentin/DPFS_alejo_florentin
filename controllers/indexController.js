const indexController = {
  index: function (req, res, next) {
    return res.render("index", { title: "Superlative" });
  },
  faq: function (req, res) {
    return res.render("faq", { title: "Superlative | Faq" });
  },
  us: function (req, res) {
    return res.render("us", { title: "Superlative | Nosotros" });
  },
};

module.exports = indexController;
