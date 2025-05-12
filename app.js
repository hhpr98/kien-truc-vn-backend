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
