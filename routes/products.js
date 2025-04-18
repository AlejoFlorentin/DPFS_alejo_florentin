var express = require("express");
var router = express.Router();

let productsController = require("../controllers/productsController");

router.get("/", productsController.productos);

router.get("/carrito", productsController.carrito);

router.get("/detalle/:id", productsController.detalle);

router.get("/crear", productsController.crear);

router.get("/editar/:id", productsController.editar);

router.post("/dataNewProd", productsController.dataNew);

router.put("/dataEditProd/:id", productsController.dataEdit);

router.delete("/:id", productsController.delete);

module.exports = router;
