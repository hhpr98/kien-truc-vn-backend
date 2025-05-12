const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await db.project.findAll();
        res.json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
