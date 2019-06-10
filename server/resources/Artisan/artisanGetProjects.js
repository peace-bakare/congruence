const uuidv1 = require("uuid/v1");

const Artisan = require("./artisanModel");
const { createValidator } = require("../../lib/validator");
const { createError, sendSuccess } = require("../../lib/responseHandler");

const getAllArtisanProjectsValidator = createValidator("artisanId.string");

function getAllArtisanProjectsFn({ artisanId }){

  return getPopulatedArtisan()
    .then(checkIfArtisanExists)
    .then(extractProjects);

  function getPopulatedArtisans() {
    return Artisan.find({ artisanId })
      .populate('projects');
  }

  function checkIfArtisanExists(artisanDoc) {
    if (!artisanDoc)
      throw createError(404, 'ARTISAN_NOT_FOUND');
    return artisanDoc;
  }

  function extractProjects(artisanDoc) {
    return artisanDoc.projects;
  }

}

function getAllArtisanProjectsRoute(req, res, next){
  getAllArtisanProjectsValidator(req.params)
    .catch(sendBadRequestError)
    .then(() => getAllArtisanProjectsFn(req.params))
    .then(sendSuccessResponse)
    .catch(next);

  function sendBadRequestError(error){
    throw createError(400, "BAD_REQUEST_BODY", error.errors)
  }

  function sendSuccessResponse(projects){
    sendSuccess(res, 200, projects)
  }
}

module.exports = {
  fn: getAllArtisanProjectsFn,
  route: getAllArtisanProjectsRoute
}