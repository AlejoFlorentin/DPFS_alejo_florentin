const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
let db = require('../database/models');

const usersControllers = {
  login: function (req, res, next) {
    return res.render('users/login', { title: 'Superlative | Login' });
  },
  registro: function (req, res, next) {
    return res.render('users/register', { title: 'Superlative | Registro' });
  },
  perfil: function (req, res, next) {
    return res.render('users/profile', { title: 'Superlative | Perfil' });
  },
  dataLog: async (req, res, next) => {
    try {
      //Me traigo todos los usuarios ya registrados

      const users = await db.Users.findAll({
        include: [{ association: 'UserCategory', attributes: ['name'] }],
      });
      const user = users.find(user => user.email == req.body.email);

      if (!user) {
        return res.redirect('/usuarios/login?error=email');
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        req.session.lastUser = {
          id: user.id,
          name: user.firstName,
          lastName: user.lastName,
          phone: user.telefono,
          email: user.email,
          category: user.UserCategory.name,
          image: user.image,
        };

        if (req.body.remember) {
          res.cookie('recordame', user.email, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
        }

        return res.redirect('/');
      } else {
        return res.redirect('/usuarios/login?error=pass');
      }
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Error en el registro');
    }
  },
  dataReg: async (req, res) => {
    try {
      //Me traigo todos los usuarios ya registrados
      const users = await db.Users.findAll({
        include: [{ association: 'UserCategory', attributes: ['name'] }],
      });

      const category = await db.UserCategories.findOne({
        where: { name: req.body.category },
      });

      if (users.find(user => user.email === req.body.email)) {
        return res.redirect('/usuarios/registro?error=email');
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10); //encriptamos la contraseña con nivel de seguridad 10

      const newUser = {
        firstName: req.body.name,
        lastName: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        password: hashedPassword,
        category: category.id,
        image: req.file ? '/img/users/' + req.file.filename : '/img/users/default.jpg',
      };

      await db.Users.create(newUser);

      res.redirect('/usuarios/login');
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Error en el registro');
    }
  },
};

module.exports = usersControllers;
