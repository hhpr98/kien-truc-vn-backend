const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const getImagePath = require('../helpers/getImagePath');
const router = express.Router();

const baseStoragePath = getImagePath();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderName = req.body.folder || ''; // default to root if not provided
        // Prevent directory traversal attacks
        folderName = folderName.replace(/(\.\.(\/|\\|$))+/g, '');
        const uploadPath = path.join(baseStoragePath, folderName);

        // Create the folder if it doesn't exist
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            // Save the folder info for later response (optional)
            req.folder = folderName;
            cb(null, uploadPath);
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
        filename: req.file.filename,
        path: req.file.path,
        folder: req.folder || null
    });
});

module.exports = router;
