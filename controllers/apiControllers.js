const express = require('express');
const projectControllers = require('./projectControllers');
const uploadControllers = require('./uploadControllers');

const apiControllers = express.Router();

// API route
apiControllers.get('/', (req, res) => {
  res.json({ message: 'This is the API endpoint' });
});

// Use projectControllers for project routes
apiControllers.use('/projects', projectControllers);
apiControllers.use('/upload', uploadControllers);

module.exports = apiControllers;
