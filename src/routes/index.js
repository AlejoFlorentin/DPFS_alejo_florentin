var express = require("express");
var router = express.Router();

let indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index);

router.get("/faq", indexController.faq);

router.get("/us", indexController.us);

module.exports = router;
