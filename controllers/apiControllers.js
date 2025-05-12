const express = require('express');
const projectControllers = require('./projectControllers');

const apiControllers = express.Router();

// API route
apiControllers.get('/', (req, res) => {
  res.json({ message: 'This is the API endpoint' });
});

// Use projectControllers for project routes
apiControllers.use('/projects', projectControllers);

module.exports = apiControllers;
