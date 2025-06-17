const express = require('express');
const db = require('../models');
const fs = require('fs');
const path = require('path');
const getImagePath = require('../helpers/getImagePath');
const { v4: uuidv4 } = require('uuid');

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
      if (!project.dataValues.projectMainURL && images.length > 0) {
        project.dataValues.projectMainURL = images[0];
      }
    }
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get the 3 latest projects
router.get('/last3', async (_, res) => {
  try {
    const imagePath = getImagePath();
    const projects = await db.project.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3
    });
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
      if (!project.dataValues.projectMainURL && images.length > 0) {
        project.dataValues.projectMainURL = images[0];
      }
    }
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const imagePath = getImagePath();
    console.log(req.params.id);
    const project = await db.project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
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
    if (!project.dataValues.projectMainURL && images.length > 0) {
      project.dataValues.projectMainURL = images[0];
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { projectName, projectFolder } = req.body;
    if (!projectName || !projectFolder) {
      return res.status(400).json({ error: 'projectName and projectFolder are required' });
    }

    const productDetail = req.body.productDetail || '';
    const projectDescription = req.body.projectDescription || '';
    const newProject = await db.project.create({
      projectId: uuidv4(),
      projectName,
      projectFolder,
      productDetail,
      projectDescription
    });
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectName = req.body.projectName || "";
    if (!id || !projectName) {
      return res.status(400).json({ error: 'Project ID and projectName are required' });
    }

    const { productDetail, projectDescription, projectMainURL } = req.body;
    const project = await db.project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.update({
      projectName,
      productDetail,
      projectDescription,
      projectMainURL
    });
    res.json(project);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
