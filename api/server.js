const express = require('express');
const server = express();
const actionsRoutes = require('../api/actions/actions-router');
const projectsRoutes = require('../api/projects/projects-router');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} to ${req.url} at ${new Date().toISOString()}`);
    next();
});   

server.use((err, req, res, next) => {
    console.log(`Error: ${err}`);
    res.status(500).json({
        message: 'Something went wrong'
    });
    next();
});


server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);


module.exports = server;
