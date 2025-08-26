const { body } = require('express-validator');
let db = require('../database/models');
const bcrypt = require('bcrypt');

const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isString()
    .isEmail()
    .withMessage('Email should be a valid email address')
    .custom(async email => {
      const user = await db.User.findOne({ where: { email: email } });

      if (!user) {
        throw new Error('Email not found');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .custom(async (password, { req }) => {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      const match = await bcrypt.compare(password, user.password);
      if (user && !match) {
        throw new Error('Invalid password');
      }
      return true;
    }),
];

module.exports = loginValidator;
