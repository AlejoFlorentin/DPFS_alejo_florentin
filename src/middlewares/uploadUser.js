const multer = require('multer');
const path = require('path');

//Configuracion de multer

const storage = multer.diskStorage({
  //donde se guarda
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/users'));
  },
  // con que nombre se guarda
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'user-' + uniqueSuffix + ext);
  },
});

module.exports = multer({ storage });
