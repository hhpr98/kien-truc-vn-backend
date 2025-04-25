const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'ui')));

// API route
app.use('/api', (req, res) => {
  res.json({ message: 'This is the API endpoint' });
});

// Catch-all handler for React app
app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
