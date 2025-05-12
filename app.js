const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const apiControllers = require('./controllers/apiControllers');

const app = express();
dotenv.config();

// structure on the host:
// - webapp
//   - backend
//     - app.js
//   - ui
//     - dist (build output directory)
//   - uploads
//     - images
//       - du-an
const env = process.env.NODE_ENV || 'production';
const config = require(path.join(__dirname, './config/config.json'))[env];
// Serve static files from the images directory in host
app.use("/images", express.static(config['image-path']));
console.log("Serving images from: ", config['image-path']);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ui/dist')));

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

app.use('/api', apiControllers);

// Catch-all handler for React app
app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/dist', 'index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
