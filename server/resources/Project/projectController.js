const uuidv1 = require('uuid/v1');
const Project = require('./projectModel');

const { sendError, sendResponse } = require('../../lib/responseHandler');

class Project {
  static createProject(req, res, next) {
    const projectDTO = req.body;

    // create project
    const project = new Project(projectDTO);
    project.ref = uuidv1();

    project.save()
      .then(end)
      .catch(next);

    function end(doc) {
      sendResponse(201, doc);
    }
  }

  static getAllProjects(req, res, next) {
    Project.fetchAll()
      .then(end)
      .catch(next);

    function end(docs) {
      sendResponse(200, docs);
    }
  }
}