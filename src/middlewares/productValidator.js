const { body } = require('express-validator');
let db = require('../database/models');

const productValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isNumeric()
    .withMessage('Stock must be a number'),
  body('category').notEmpty().withMessage('Category is required').isString(),
  body('image')
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/, 'i')
    .withMessage('Image must be a valid URL (JPG, JPEG, PNG, GIF)'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters long'),
];

module.exports = productValidator;
