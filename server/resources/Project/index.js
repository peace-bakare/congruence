const express = require('express');

const projectController = require('./projectController');
const validateToken = require('../../middlewares/validateToken');

const projectRouter = express.Router();
module.exports = projectRouter;

projectRouter.post('/', validateToken, projectController.createProject);
projectRouter.delete('/:projectId', validateToken, projectController.deleteProject);
