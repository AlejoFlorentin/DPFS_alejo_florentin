var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadUser');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
let usersController = require('../controllers/usersController');

router.get('/login', guestMiddleware, usersController.login);

router.get('/registro', guestMiddleware, usersController.registro);

router.get('/perfil', authMiddleware, usersController.perfil);

router.post('/login', usersController.dataLog);

router.post('/registro', upload.single('image'), usersController.dataReg);

router.post('/logout', usersController.logout);
module.exports = router;
