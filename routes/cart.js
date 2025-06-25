var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.carrito);

router.post('/comprar', cartController.comprar);

router.post('/agregar/:id', cartController.agregar);

router.post('/agregar/detalle/:id', cartController.agregarDetalle);

router.delete('/eliminar', cartController.eliminar);

router.delete('/eliminarItem/:id', cartController.eliminarItem);

module.exports = router;
