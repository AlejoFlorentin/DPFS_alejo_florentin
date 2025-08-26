var express = require('express');
var router = express.Router();
let productsController = require('../controllers/productsController');
const upload = require('../middlewares/uploadProduct');
const adminMiddleware = require('../middlewares/adminMiddleware');
const productValidator = require('../middlewares/productValidator');

router.get('/', productsController.productos);

router.get('/detalle/:id', productsController.detalle);

router.get('/crear', adminMiddleware, productsController.crear);

router.get('/editar/:id', adminMiddleware, productsController.editar);

router.post(
  '/crear',
  adminMiddleware,
  upload.array('images', 3),
  productValidator,
  productsController.dataNew
);

router.put('/dataEditProd/:id', upload.array('images', 3), productsController.dataEdit);

router.delete('/:id', productsController.delete);

module.exports = router;
