const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;
    cb(null, path.join(__dirname, `../../public/img/products/${category}`));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'product-' + uniqueSuffix + ext);
  },
});

const allowedExts = new Set(['.jpg', '.jpeg', '.png', '.gif']);

const upload = multer({
  storage,
  limits: { files: 3, fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimetypeOk = /^image\/(jpe?g|png|gif)$/i.test(file.mimetype);
    const extOk = allowedExts.has(ext);

    if (mimetypeOk && extOk) {
      return cb(null, true);
    }

    req.fileValidationError = 'Invalid image format. Only JPG, JPEG, PNG, and GIF are allowed.';
    return cb(null, false);
  },
});

module.exports = upload;
