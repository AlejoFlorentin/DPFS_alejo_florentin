const fs = require("fs").promises;
const path = require("path");

const productsController = {
  editar: function (req, res, next) {
    return res.render("products/editProduct", {
      title: "Superlative",
    });
  },
  crear: function (req, res, next) {
    return res.render("products/createProduct", { title: "Superlative" });
  },
  productos: function (req, res, next) {
    return res.render("products/product", { title: "Superlative | Productos" });
  },
  carrito: function (req, res, next) {
    return res.render("products/cart", { title: "Superlative | Carrito" });
  },
  detalle: async function (req, res, next) {
    try {
      const filePath = path.join(__dirname, "../public/js/prendas.json"); //obtener la ruta absoluta
      const data = await fs.readFile(filePath, "utf8"); // leer el json de manera asincronica
      const products = JSON.parse(data);

      let product = products.find((product) => product.id == req.params.id);
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      return res.render("products/productDetail", {
        title: "Superlative | Detalle",
        producto: product,
      });
    } catch (err) {
      console.error("Error leyendo el archivo JSON:", err);
      return res.status(500).send("Error interno del servidor");
    }
  },
  dataNew: function (req, res, next) {
    let product = req.body;
    return res.redirect("/productos/");
    return res.send(product);
  },

  dataEdit: function (req, res, next) {
    let product = req.body;

    return setTimeout(() => {
      res.redirect("/productos/");
      // res.send(product);
    }, 1500);
  },
};

module.exports = productsController;
