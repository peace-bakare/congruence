const uuidv1 = require('uuid/v1');
const Project = require('./projectModel');

const { sendSuccess } = require('../../lib/responseHandler');

class ProjectController {
  static createProject(req, res, next) {
    const projectDTO = req.body;

    // create project
    const project = new Project(projectDTO);
    project.ref = uuidv1();

    project.save()
      .then(end)
      .catch(next);

    function end(doc) {
      sendSuccess(res, 201, doc);
    }
  }

  static getAllProjects(req, res, next) {
    Project.fetchAll()
      .then(end)
      .catch(next);

    function end(docs) {
      sendSuccess(res, 200, docs);
    }
  }
}

module.exports = ProjectController;