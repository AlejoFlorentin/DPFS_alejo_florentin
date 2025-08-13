const multer = require('multer');
const path = require('path');

//Configuracion de multer

const storage = multer.diskStorage({
  //donde se guarda
  destination: (req, file, cb) => {
    const category = req.body.category;
    cb(null, path.join(__dirname, `../../public/img/products/${category}`));
  },
  // con que nombre se guarda
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { files: 3, fileSize: 2 * 1024 * 1024 }, // hasta 3 imágenes, 2MB cada una
  fileFilter: (req, file, cb) => {
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)) {
      return cb(new Error('Formato de imagen no permitido'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
