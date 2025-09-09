var express = require('express');
var router = express.Router();
let usersApiController = require('../../controllers/api/usersApiController');

router.get('/', usersApiController.getAll);
router.get('/:id', usersApiController.getById);

module.exports = router;
