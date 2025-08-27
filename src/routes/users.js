var express = require('express');
var router = express.Router();
let usersController = require('../controllers/usersController');
const upload = require('../middlewares/uploadUser');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const loginValidator = require('../middlewares/loginValidator');
const registerValidator = require('../middlewares/registerValidator');

router.get('/login', guestMiddleware, usersController.login);

router.get('/registro', guestMiddleware, usersController.registro);

router.get('/perfil', authMiddleware, usersController.perfil);

router.post('/login', loginValidator, usersController.dataLog);

router.post('/registro', upload.single('image'), registerValidator, usersController.dataReg);

router.post('/logout', usersController.logout);
module.exports = router;
