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

  productos: async function (req, res, next) {
    try {
      const filePath = path.join(__dirname, "../data/products.json");
      const data = await fs.readFile(filePath, "utf8");
      let products = JSON.parse(data);

      const categoria = req.query.categoria;

      // Si hay categoría, filtrar
      if (categoria) {
        products = products.filter((p) => p.category === categoria);
      }

      return res.render("products/product", {
        title: "Superlative | Productos",
        products,
        req,
      });
    } catch (error) {
      console.error("Error leyendo el archivo de productos:", error);
      return res.status(500).send("Error interno del servidor");
    }
  },

  carrito: function (req, res, next) {
    return res.render("products/cart", { title: "Superlative | Carrito" });
  },
  detalle: async function (req, res, next) {
    try {
      const filePath = path.join(__dirname, "../data/products.json"); //obtener la ruta absoluta
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
  dataNew: async function (req, res, next) {
    try {
      const filePath = path.join(__dirname, "../data/products.json");
      const data = await fs.readFile(filePath, "utf8");
      const products = JSON.parse(data);

      const lastId =
        products.length > 0 ? parseInt(products[products.length - 1].id) : 0;

      const nuevoProducto = {
        id: (lastId + 1).toString(),
        title: req.body.name,
        price: parseFloat(req.body.price),
        size: req.body.size,
        stock: parseInt(req.body.stock) || 10,
        category: req.body.category,
        img: "/img/placeholder.jpg",
        description: req.body.description,
      };

      products.push(nuevoProducto);

      await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf8");

      return res.redirect("/productos");
    } catch (error) {
      console.error("Error al crear producto:", error);
      return res.status(500).send("Error al guardar el producto");
    }
  },

  dataEdit: function (req, res, next) {
    let product = req.body;

    return setTimeout(() => {
      res.redirect("/productos/");
      // res.send(product);
    }, 1500);
  },

  delete: async function (req, res) {
    try {
      const filePath = path.join(__dirname, "../data/products.json");
      const data = await fs.readFile(filePath, "utf8");
      let products = JSON.parse(data);

      const id = req.params.id;
      products = products.filter((product) => product.id !== id);

      await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf8");

      return res.redirect("/productos");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).send("Error al eliminar producto");
    }
  },
};

module.exports = productsController;
