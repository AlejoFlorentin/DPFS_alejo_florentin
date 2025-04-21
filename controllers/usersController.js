const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const usersControllers = {
  login: function (req, res, next) {
    return res.render("users/login", { title: "Superlative | Login" });
  },
  registro: function (req, res, next) {
    return res.render("users/register", { title: "Superlative | Registro" });
  },
  dataLog: async (req, res, next) => {
    try {
      //Me traigo todos los usuarios ya registrados
      const filePath = path.join(__dirname, "../data/users.json");
      const data = await fs.readFile(filePath, "utf8");
      const users = JSON.parse(data);

      const user = users.find((user) => user.email == req.body.email);

      if (!user) {
        return res.redirect("/usuarios/login?error=email");
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        req.session.lastUser = {
          id: user.id,
          name: user.firstName,
          email: user.email,
          category: user.category,
          image: user.image,
        };

        //  Si se marco "recordar", guardamos cookie por 7 días
        if (req.body.remember) {
          res.cookie("recordame", user.email, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
          }); // 7 días
        }

        return res.redirect("/");
      } else {
        return res.redirect("/usuarios/login?error=pass");
      }
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).send("Error en el registro");
    }
  },
  dataReg: async (req, res) => {
    try {
      //Me traigo todos los usuarios ya registrados
      const filePath = path.join(__dirname, "../data/users.json");
      const data = await fs.readFile(filePath, "utf8");
      const users = JSON.parse(data);

      //Si hay usuario me traigo el id dle ultimo usuario sino lo seteamos en 0
      const lastId =
        users.length > 0 ? parseInt(users[users.length - 1].id) : 0;

      const hashedPassword = await bcrypt.hash(req.body.password, 10); //encriptamos la contraseña con nivel de seguridad 10

      const newUser = {
        id: lastId + 1,
        firstName: req.body.name,
        lastName: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        password: hashedPassword,
        category: req.body.category || "user",
        image: req.file
          ? "/img/users/" + req.file.filename
          : "/img/users/default.jpg",
      };

      users.push(newUser);
      await fs.writeFile(filePath, JSON.stringify(users, null, 2));

      res.redirect("/usuarios/login");
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).send("Error en el registro");
    }
  },
};

module.exports = usersControllers;
