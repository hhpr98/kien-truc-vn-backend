const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const getImagePath = require('../helpers/getImagePath');
const router = express.Router();

const baseStoragePath = getImagePath();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create the folder if it doesn't exist
        fs.mkdir(baseStoragePath, { recursive: true }, (err) => {
            if (err)
                return cb(err);

            cb(null, baseStoragePath);
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
        path: req.file.path
    });
});

module.exports = router;
