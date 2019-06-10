const uuidv1 = require('uuid/v1');
const Project = require('./projectModel');

const { createError, sendSuccess } = require('../../lib/responseHandler');
const { createValidator } = require("../../lib/validator");

// create validators
const createProjectValidator = createValidator("title.string, description.string");

class ProjectController {
  static createProject(req, res, next) {
    const projectDTO = req.body;

    createProjectValidator(projectDTO)
      .catch(throwError)
      .then(createNewProject)
      .then(appendRef)
      .then(saveProject)
      .then(end)
      .catch(next);

      function createNewProject() {
        const project = new Project(projectDTO);
        return project;
      }

      function appendRef(project) {
        project.ref = uuidv1();
        return project;
      }

      function saveProject(project) {
        return project.save()
      }

      function throwError(error) {
        throw createError(400, 'BAD_REQUEST', error.errors);
      }

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