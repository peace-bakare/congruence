const Artisan = require("./artisanModel")
const { createError, sendSuccess } = require("../../lib/responseHandler")
const { createValidator } = require("../../lib/validator")

const searchArtisanValidator = createValidator("craft.string")

function searchArtisanFn({ craft }){
	return Artisan.find({ craft: craft })
				.then(filterArtisan)

	function filterArtisan(artisans){
		return artisans.map(artisan => {
			let modifiedArtisan = {
				firstname: artisan.firstname,
				lastname: artisan.lastname,
				nickname: artisan.nickname,
				craft: artisan.craft
			}

			return modifiedArtisan
		})
	}
}

function searchArtisanRoute(req, res, next){
	
	searchArtisanValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => searchArtisanFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)

	function sendBadRequestError(errors){
		throw createError(403, "BAD_REQUEST_BODY", errors.errors)
	}

	function createSuccessResponse(artisans){
		return {
			artisans: artisans
		}
	}

	function sendSuccessResponse(response){
		sendSuccess(res, 200, response)
	}

}

module.exports = {
	fn: searchArtisanFn,
	route: searchArtisanRoute
}