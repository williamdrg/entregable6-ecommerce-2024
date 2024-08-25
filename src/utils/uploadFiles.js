const multer = require('multer');
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('The file must be an image.'))
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })

module.exports = upload

/* const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ruta de la carpeta donde se guardarán los archivos
const uploadDir = path.join(__dirname, 'uploads/images');

// Verifica si la carpeta existe, si no, la crea
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Usa la carpeta que acabas de verificar o crear
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('The file must be an image.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
 */