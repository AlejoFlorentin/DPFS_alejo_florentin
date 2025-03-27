var express = require("express");
var router = express.Router();

let usersController = require("../controllers/usersController");

router.get("/login", usersController.login);

router.get("/registro", usersController.registro);

router.post("/dataLog", usersController.dataLog);

router.post("/dataReg", usersController.dataReg);
module.exports = router;
