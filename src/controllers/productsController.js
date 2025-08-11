let db = require("../database/models");

const productsController = {
  editar: async function (req, res, next) {
    let id = req.params.id;
    try {
      let product = await db.Products.findByPk(id, {
        include: [
          {
            association: "ProductCategory",
            attributes: ["name"],
          },
          {
            association: "sizes",
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          },
        ],
      });
      console.log("Producto encontrado:", product);
      return res.render("products/editProduct", {
        title: "Superlative",
        css: "editProduct.css",
        product,
      });
    } catch (error) {
      console.error("Error leyendo el archivo de productos:", error);
      return res.status(500).send("Error interno del servidor");
    }
  },
  crear: function (req, res, next) {
    return res.render("products/createProduct", {
      title: "Superlative",
      css: "createProduct.css",
    });
  },

  productos: async function (req, res, next) {
    try {
      const categoria = req.query.categoria;

      let products;

      // Si hay categoría, filtrar
      if (categoria) {
        products = await db.Product.findAll({
          include: [
            {
              association: "category",
            },
            {
              association: "images",
              attributes: ["url"],
            },
          ],
          where: { "$category.name$": categoria },
        });
      } else {
        products = await db.Product.findAll({
          attributes: {
            exclude: ["category_id"],
          },
          include: [
            {
              association: "images",
              attributes: ["url"],
            },
          ],
        });
      }

      function formatNumber(numero) {
        let partes = numero.toString().split(".");
        let parteEntera = partes[0];
        let parteDecimal = partes.length > 1 ? partes[1] : "";

        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let numeroFormateado = "$ " + parteEntera;
        if (parteDecimal !== "") {
          numeroFormateado += "," + parteDecimal;
        }

        return numeroFormateado;
      }

      return res.render("products/product", {
        title: "Superlative | Productos",
        products,
        css: "products.css",
        req,
        formatNumber,
      });
    } catch (error) {
      console.error("Error leyendo los productos:", error);
      return res.status(500).send("Error interno del servidor");
    }
  },
  detalle: async function (req, res, next) {
    try {
      let product;

      product = await db.Product.findByPk(req.params.id, {
        include: [
          {
            association: "productSizes",
            attributes: [],
          },
          {
            association: "ProductCategory",
            attributes: ["name"],
          },
          {
            association: "images",
            attributes: ["url"],
          },
        ],
      });
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      return res.render("products/productDetail", {
        title: "Superlative | Detalle",
        css: "productDetail.css",
        producto: product,
      });
    } catch (err) {
      console.error("Error leyendo el archivo JSON:", err);
      return res.status(500).send("Error interno del servidor");
    }
  },
  dataNew: async function (req, res, next) {
    try {
      const categoria = await db.ProductsCategories.findOne({
        where: { name: req.body.category },
      });

      const size = await db.Sizes.findOne({
        where: { size: req.body.size },
      });

      const nuevoProducto = {
        title: req.body.name,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        category: categoria.id,
        img: `/img/products/${req.body.category}/${req.file.filename}`,
        description: req.body.description,
      };

      const productoCreado = await db.Products.create(nuevoProducto);

      await db.ProductSizes.create({
        product: productoCreado.id,
        size: size.id,
      });

      return res.redirect("/productos");
    } catch (error) {
      console.error("Error al crear producto:", error);
      return res.status(500).send("Error al guardar el producto");
    }
  },

  dataEdit: async function (req, res, next) {
    try {
      const categoria = await db.ProductsCategories.findOne({
        where: { name: req.body.category },
      });
      const product = await db.Products.findByPk(req.params.id);
      const size = await db.Sizes.findOne({
        where: { size: req.body.size },
      });

      await db.Products.update(
        {
          title: req.body.name,
          price: parseFloat(req.body.price),
          stock: parseInt(req.body.stock),
          category: categoria.id,
          img: req.file
            ? `/img/products/${req.body.category}/${req.file.filename}`
            : product.img,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await db.ProductSizes.update(
        { size: size.id },
        {
          where: {
            product: req.params.id,
          },
        }
      );

      return res.redirect("/productos");
    } catch (err) {
      console.error("Error al editar producto:", err);
      return res.status(500).send("Error al editar producto");
    }
  },

  delete: async function (req, res) {
    try {
      await db.ProductSizes.destroy({
        where: {
          product: req.params.id,
        },
      });
      await db.Products.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect("/productos");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).send("Error al eliminar producto");
    }
  },
};

module.exports = productsController;
