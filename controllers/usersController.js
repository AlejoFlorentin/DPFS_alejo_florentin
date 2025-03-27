const usersControllers = {
  login: function (req, res, next) {
    return res.render("users/login", { title: "Superlative | Login" });
  },
  registro: function (req, res, next) {
    return res.render("users/register", { title: "Superlative | Registro" });
  },
  dataLog: function (req, res, next) {
    let info = req.body;
    req.session.lastUser = info; // guardamos en la sesion actual el usuario ingresado y lo podemos usar en toda la pagina
    res.cookie("user", info.email, { maxAge: 1000 * 60 * 5 }); //crear una cookie nombre,que prop y el tiempo que va a existir
    return setTimeout(() => {
      res.redirect("/");
      // res.send(req.session);
    }, 1500);
  },
  dataReg: function (req, res, next) {
    let info = req.body;
    return setTimeout(() => {
      res.redirect("/usuarios/login");
      // res.send(info);
    }, 1500);
  },
};

module.exports = usersControllers;
