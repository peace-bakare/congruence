const express = require('express');

const validateToken = require('../../middlewares/validateToken');

const createProject = require('./projectCreate');

const projectRouter = express.Router();
module.exports = projectRouter;

projectRouter.post('/', validateToken, createProject.route);
// projectRouter.delete('/:projectId', validateToken, projectController.deleteProject);
