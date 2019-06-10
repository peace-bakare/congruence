const fns = require('./projectFns');

const { createError, sendSuccess } = require('../../lib/responseHandler');
const { createValidator } = require("../../lib/validator");

// create validators
const createProjectValidator = createValidator("title.string, description.string");

class ProjectController {
  static createProject(req, res, next) {
    const projectDTO = req.body;

    createProjectValidator(projectDTO)
      .catch(throwError)
      .then(fns.createProject)
      .then(end)
      .catch(next);

      function throwError(error) {
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
}

module.exports = ProjectController;