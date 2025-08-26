const bcrypt = require('bcrypt');
let db = require('../database/models');
const { validationResult } = require('express-validator');

const usersControllers = {
  login: function (req, res, next) {
    return res.render('users/login', { title: 'Superlative | Login', css: 'login.css' });
  },
  registro: function (req, res, next) {
    return res.render('users/register', { title: 'Superlative | Registro', css: 'register.css' });
  },
  perfil: function (req, res, next) {
    return res.render('users/profile', { title: 'Superlative | Perfil', css: 'profile.css' });
  },
  dataLog: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('users/login', {
          title: 'Superlative | Login',
          css: 'login.css',
          errors: errors.mapped(),
        });
      }

      const user = await db.User.findOne({
        where: { email: req.body.email },
        include: [
          { association: 'category', attributes: { exclude: ['id'] } },
          { association: 'image', attributes: ['url'] },
        ],
      });

      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        req.session.lastUser = {
          id: user.id,
          name: user.name,
          lastName: user.last_name,
          phone: user.phone,
          email: user.email,
          category: user.category.name,
          image: user.image?.url || '/img/users/default.jpg',
        };

        if (req.body.remember) {
          res.cookie('recordame', user.id, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
        }

        return res.redirect('/');
      }
    } catch (err) {
      console.error('Error al iniciar sesión', err);
      res.status(500).send('Error en el inicio de sesión');
    }
  },
  dataReg: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('users/register', {
          title: 'Superlative | Registro',
          css: 'register.css',
          errors: errors.mapped(),
        });
      }

      const users = await db.User.findAll({
        include: [{ association: 'category', attributes: ['name'] }],
      });

      if (users.find(user => user.email === req.body.email)) {
        return res.redirect('/usuarios/registro?error=email');
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10); //encriptamos la contraseña con nivel de seguridad 10

      const newUser = {
        name: req.body.name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        category_id: 2,
      };

      const userCreated = await db.User.create(newUser);

      await db.UserImg.create({
        user_id: userCreated.id,
        url: req.file ? '/img/users/' + req.file.filename : '/img/users/default.jpg',
      });

      res.redirect('/usuarios/login');
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Error en el registro');
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    res.clearCookie('recordame');
    return res.redirect('/');
  },
};

module.exports = usersControllers;
