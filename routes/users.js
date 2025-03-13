var express = require("express");
var router = express.Router();

let usersController = require("../controllers/usersController");

router.get("/login", usersController.login);

router.get("/registro", usersController.registro);

module.exports = router;
