import multer from 'multer';
import path from 'path';

// Set up disk storage for file upload
const storage = multer.diskStorage({
  destination: './uploads/',  // Directory where files will be stored
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Unique file name
  }
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb('Error: Only images are allowed!');
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },  // Limit the file size to 1MB
  fileFilter: fileFilter
});

export default upload;  // Default export
