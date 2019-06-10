const Artisan = require('../Artisan/artisanModel');

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
      .then(() => fns.createProject(projectDTO))
      .then(appendToArtisan)
      .then(sendProjectToClient)
      .catch(next);

      function throwBadRequestError(error) {
        throw createError(400, 'BAD_REQUEST', error.errors);
      }

      /**
       * Adds a reference to the newly created project on the 
       * Artisan object
       */
      function appendToArtisan(projectDoc) {
        return Artisan.updateOne({ email: req.body.user.email }, {
          $push: {
            projects: projectDoc._id
          }
        }).then(() => projectDoc);
      }

      function sendProjectToClient(doc) {
        sendSuccess(res, 201, doc);
      }
  }

  static deleteProject(req, res, next) {
    const projectDTO = req.params;

    deleteProjectValidator(projectDTO)
      .catch(throwBadRequestError)
      .then(() => fns.deleteProject(projectDTO.projectID))
      .then(sendSuccessToClient)
      .catch(next);

    function throwBadRequestError(error) {
      throw createError(400, 'BAD_REQUEST', error.errors);
    }

    function sendSuccessToClient() {
      sendSuccess(res, 200);
    }
  }
}

module.exports = ProjectController;