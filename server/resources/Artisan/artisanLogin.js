const Artisan = require("./artisanModel")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../../config")
const { compare } = require("bcrypt")
const { createValidator } = require("../../lib/validator")
const { createError, sendSuccess } = require("../../lib/responseHandler")

const loginArtisanValidator = createValidator("email.string, password.string")

function loginArtisanFn({ email, password }){

	return checkIfEmailExists()
			.then(checkForCorrectPassword)
			.then(generateToken)

	function checkIfEmailExists(){
		return Artisan.findOne({ email: email })
				.then(handleExists)

		function handleExists(artisan){
			if(!artisan)
				throw createError(403, "INVALID_USERNAME_PASSWORD")
			return artisan
		}
	}

	function checkForCorrectPassword(artisan){
		return compare(password, artisan.password)
					.then(handleCompare)

		function handleCompare(same){
			if(!same)
				throw createError(403, "INVALID_USERNAME_PASSWORD")
			return artisan
		}
	}

	function generateToken(artisan){
		return jwt.sign({ email: artisan.email }, SECRET_KEY, { expiresIn: "7d" })
	}

} 

function loginArtisanRoute(req, res, next){
	loginArtisanValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => loginArtisanFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)


	function sendBadRequestError(error){
		throw createError(400, "BAD_REQUEST_BODY", error.errors)
	}

	function createSuccessResponse(token){
		return {
			message: "Artisan logged in successfully",
			token: token
		}
	}

	function sendSuccessResponse(response){
		sendSuccess(res, 200, response)
	}
}

module.exports = {
	fn: loginArtisanFn,
	route: loginArtisanRoute
}