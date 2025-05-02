const multer = require("multer");
const path = require("path");

//Configuracion de multer

const storage = multer.diskStorage({
  //donde se guarda
  destination: (req, file, cb) => {
    const category = req.body.category;
    cb(null, path.join(__dirname, `../public/img/products/${category}`));
  },
  // con que nombre se guarda
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "product-" + uniqueSuffix + ext);
  },
});

module.exports = multer({ storage });
