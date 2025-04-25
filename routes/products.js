var express = require("express");
var router = express.Router();
const upload = require("../services/uploadProduct");

let productsController = require("../controllers/productsController");

router.get("/", productsController.productos);

router.get("/carrito", productsController.carrito);

router.get("/detalle/:id", productsController.detalle);

router.get("/crear", productsController.crear);

router.get("/editar/:id", productsController.editar);

router.post("/dataNewProd", upload.single("image"), productsController.dataNew);

router.put(
  "/dataEditProd/:id",
  upload.single("image"),
  productsController.dataEdit
);

router.delete("/:id", productsController.delete);

module.exports = router;
