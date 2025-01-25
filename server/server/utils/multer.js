const multer = require('multer');
const path = require("path");
const fs = require('fs');

// Create directories if they don't exist
const createRequiredDirectories = () => {
  const dirs = [
    './Records',
    './Records/history',
    './Records/templates'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Create directories on startup
createRequiredDirectories();

//configure how the files are stored
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //where to store the file
      cb(null, "./Records/templates");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const newFileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
        cb(null, newFileName);
    },
});
  
const fileFilter = (req, file, cb) => {
    //accept jpg, png, or pdf files
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPG, PNG, or PDF files are allowed."), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB limit
    },
    fileFilter: fileFilter,
});

module.exports = upload;