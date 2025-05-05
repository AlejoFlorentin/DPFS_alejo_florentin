var express = require("express");
var router = express.Router();
const upload = require("../services/uploadUser");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");

let usersController = require("../controllers/usersController");

router.get("/login", guestMiddleware, usersController.login);

router.get("/registro", guestMiddleware, usersController.registro);

router.get("/perfil", authMiddleware, usersController.perfil);

router.post("/dataLog", usersController.dataLog);

router.post("/dataReg", upload.single("image"), usersController.dataReg);
module.exports = router;
