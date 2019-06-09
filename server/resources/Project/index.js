const express = require('express');

const projectController = require('./projectController');

const projectRouter = express.Router();
module.exports = projectRouter;

projectRouter.route('/')
  .post(projectController.createProject)
  .get(projectController.getAllProjects);