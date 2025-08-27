const { body } = require('express-validator');
let db = require('../database/models');

const registerValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('last_name')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('phone')
    .isNumeric()
    .withMessage('Phone number must be numeric')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isString()
    .isEmail()
    .withMessage('Email should be a valid email address')
    .isLength({ min: 8 })
    .withMessage('Email must be at least 8 characters long')
    .custom(async email => {
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        throw new Error('Email already in use');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  body('image').custom((_, { req }) => {
    if (req.fileValidationError) {
      throw new Error(req.fileValidationError);
    }
    return true;
  }),
];

module.exports = registerValidator;
