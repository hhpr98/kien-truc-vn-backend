// Handle logs session in top of app.js
const logger = require('./appLogger');
logger(); // Initialize logger

const express = require('express');
const apiControllers = require('./controllers/apiControllers');
const getImagePath = require('./helpers/getImagePath');
const path = require('path');
const cors = require('cors');

const app = express();

// Allow cross-origin requests from the React app for development
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://apdesignarch.vn'
  ],
  credentials: true
}));

// structure on the host:
// - webapp
//   - backend
//     - app.js
//   - ui
//     - dist (build output directory)
//   - uploads
//     - images
//       - du-an
// Serve static files from the images directory in host
app.use("/images", express.static(getImagePath()));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ui/dist')));

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

app.use('/api', apiControllers);

// Catch-all handler for React app
app.get('*splat', (_, res) => {
  res.sendFile(path.join(__dirname, '../ui/dist', 'index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
