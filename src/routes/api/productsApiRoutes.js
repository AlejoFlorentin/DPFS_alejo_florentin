var express = require('express');
var router = express.Router();
let productsApiController = require('../../controllers/api/productsApiController');

router.get('/', productsApiController.getAll);
router.get('/:id', productsApiController.getById);

module.exports = router;
