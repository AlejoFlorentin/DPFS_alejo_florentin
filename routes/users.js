var express = require("express");
var router = express.Router();
const upload = require("../services/uploadUser");

let usersController = require("../controllers/usersController");

router.get("/login", usersController.login);

router.get("/registro", usersController.registro);

router.post("/dataLog", usersController.dataLog);

router.post("/dataReg", upload.single("image"), usersController.dataReg);
module.exports = router;
