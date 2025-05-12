const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

function getImagePath() {
    const env = process.env.NODE_ENV || 'production';
    const config = require(path.join(__dirname, '../config/config.json'))[env];
    console.log("Serving images from: ", config['image-path']);
    return config['image-path'];
};

module.exports = getImagePath;
