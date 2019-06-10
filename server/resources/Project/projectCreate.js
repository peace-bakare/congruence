const uuidv1 = require("uuid/v1");

const Project = require("./projectModel");
const Artisan = require("../Artisan/artisanModel");

const { createValidator } = require("../../lib/validator");
const { createError, sendSuccess } = require("../../lib/responseHandler");

const createProjectValidator = createValidator("title.string, description.string");

function createProjectFn({ title, description }, email) {

  return createNewProject()
    .then(appendProjectToArtisan);

  function createNewProject() {
    return Project.create({
      title,
      description
    });
  }

  function appendProjectToArtisan(project) {
    return Artisan.updateOne({ email }, {
      $push: {
        projects: project._id
      }
    });
  }

}

function createProjectRoute(req, res, next){
  createProjectValidator(req.body)
    .catch(sendBadRequestError)
    .then(() => createProjectFn(req.body, req.body.user.email))
    .then(sendSuccessResponse)
    .catch(next)

  function sendBadRequestError(error){
    throw createError(400, "BAD_REQUEST_BODY", error.errors)
  }

  function sendSuccessResponse(response){
    sendSuccess(res, 201, 'Project created successfully');
  }
}

module.exports = {
  fn: createProjectFn,
  route: createProjectRoute
}