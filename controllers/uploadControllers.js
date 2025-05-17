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

// Move the file into the final destination (project folder)
router.post('/complete', (req, res) => {
    const { filename, folder } = req.body;
    const sourceFile = path.join(baseStoragePath, filename);
    const destinationPath = path.join(baseStoragePath, folder);
    const destinationFile = path.join(destinationPath, filename);
    // Create the destination folder if it doesn't exist
    fs.mkdir(destinationPath, { recursive: true }, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to create destination folder', error: err.message });
        }
    });

    fs.rename(sourceFile, destinationFile, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to move file', error: err.message });
        }
        res.json({ message: 'File moved successfully', file: filename });
    });
});

module.exports = router;
