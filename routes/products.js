var express = require("express");
var router = express.Router();

let productsController = require("../controllers/productsController");

/* GET users listing. */
router.get("/", productsController.productos);

router.get("/carrito", productsController.carrito);

router.get("/detalle/:id", productsController.detalle);

router.get("/crear", productsController.crear);

router.get("/editar", productsController.editar);

router.post("/dataNewProd", productsController.dataNew);

router.post("/dataEditProd", productsController.dataEdit);

router.delete("/:id", productsController.delete);

module.exports = router;
