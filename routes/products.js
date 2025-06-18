var express = require('express');
var router = express.Router();
const upload = require('../services/uploadProduct');
const adminMiddleware = require('../middlewares/adminMiddleware');
let productsController = require('../controllers/productsController');

router.get('/', productsController.productos);

router.get('/detalle/:id', productsController.detalle);

router.get('/crear', adminMiddleware, productsController.crear);

router.get('/editar/:id', adminMiddleware, productsController.editar);

router.post('/dataNewProd', adminMiddleware, upload.single('image'), productsController.dataNew);

router.put('/dataEditProd/:id', upload.single('image'), productsController.dataEdit);

router.delete('/:id', productsController.delete);

module.exports = router;
