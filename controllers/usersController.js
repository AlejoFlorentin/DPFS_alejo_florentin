const usersControllers = {
  login: function (req, res, next) {
    return res.render("users/login", { title: "Superlative | Login" });
  },
  registro: function (req, res, next) {
    return res.render("users/register", { title: "Superlative | Registro" });
  },
};

module.exports = usersControllers;
