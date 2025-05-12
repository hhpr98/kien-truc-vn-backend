const express = require('express');
const db = require('../models');
const fs = require('fs');
const path = require('path');
const getImagePath = require('../helpers/getImagePath');

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const imagePath = getImagePath();
    const projects = await db.project.findAll();
    for (const project of projects) {
      const imagesDir = path.join(imagePath, project.projectFolder);
      let images = [];
      try {
        if (fs.existsSync(imagesDir)) {
          images = fs.readdirSync(imagesDir);
        }
      } catch (err) {
        console.error(`Error reading images for project ${project.id}:`, err);
      }
      project.dataValues.images = images;
    }
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
