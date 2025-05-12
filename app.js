const express = require('express');
const path = require('path');
const apiControllers = require('./controllers/apiControllers');

const app = express();

// Serve static files from the React app
// structure on the host:
// - webapp
//   - backend
//     - app.js
//   - ui
//     - dist (build output directory)
//   - images
//     - du-an
app.use(express.static(path.join(__dirname, '../ui/dist')));
const env = process.env.NODE_ENV || 'production';
const config = require(path.join(__dirname, './config/config.json'))[env];
app.use(express.static(config['image-path']));

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
