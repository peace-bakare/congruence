const fns = require('./projectFns');

const { createError, sendSuccess } = require('../../lib/responseHandler');
const { createValidator } = require("../../lib/validator");

// create validators
const createProjectValidator = createValidator("title.string, description.string");
const deleteProjectValidator = createValidator("projectId.string");

class ProjectController {
  static createProject(req, res, next) {
    const projectDTO = req.body;

    createProjectValidator(projectDTO)
      .catch(throwBadRequestError)
      .then(fns.createProject)
      .then(end)
      .catch(next);

      function throwBadRequestError(error) {
        throw createError(400, 'BAD_REQUEST', error.errors);
      }

      function end(doc) {
        sendSuccess(res, 201, doc);
      }
  }

  static getAllProjects(req, res, next) {
    fns.getAllProjects()
      .then(end)
      .catch(next);

    function end(docs) {
      sendSuccess(res, 200, docs);
    }
  }

  static deleteProject(req, res, next) {
    const projectDTO = req.params;

    deleteProjectValidator(projectDTO)
      .catch(throwBadRequestError)
      .then(fns.deleteProject(projectDTO.projectID))
      .then(end)
      .catch(next);

    function throwBadRequestError(error) {
      throw createError(400, 'BAD_REQUEST', error.errors);
    }

    function end(doc) {
      sendSuccess(res, 201, doc);
    }
  }
}

module.exports = ProjectController;