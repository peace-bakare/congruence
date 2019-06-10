const express = require('express');

const projectController = require('./projectController');

const projectRouter = express.Router();
module.exports = projectRouter;

projectRouter.route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

projectRouter.delete('/:projectId', projectController.deleteProject);
