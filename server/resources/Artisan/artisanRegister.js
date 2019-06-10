const uuidv1 = require("uuid/v1")
const Artisan = require("./artisanModel")
const { hash } = require("bcrypt")
const { createValidator } = require("../../lib/validator")
const { createError, sendSuccess } = require("../../lib/responseHandler")

const registerArtisanValidator = createValidator("firstname.string, lastname.string, nickname.string, email.string, password.string, craft.string")

function registerArtisanFn({ firstname, lastname, nickname, email, password, craft }){

	return checkIfEmailExists()
			.then(checkIfNicknameExists)
			.then(() => hash(password, 11))
			.then(createArtisan)
			.then(saveArtisan)

	function checkIfNicknameExists(){
		return Artisan.findOne({ nickname: nickname })
				.then(handleExists)

		function handleExists(artisan){
			if(artisan)
				throw createError(403, "NICK_NAME_EXISTS")
		}
	}

	function checkIfEmailExists(){
		return Artisan.findOne({ email: email })
				.then(handleExists)

		function handleExists(artisan){
			if(artisan)
				throw createError(403, "EMAIL_EXISTS")
		}
	}

	function createArtisan(hashedPassword){
		const newArtisan = new Artisan({
			ref: uuidv1().split("-").shift(),
			firstname: firstname,
			lastname: lastname,
			nickname: nickname,
			email: email,
			password: hashedPassword,
			craft: craft,
			projects: []
		})

		return newArtisan
	}

	function saveArtisan(artisan){
		return artisan.save()
	}

}

function registerArtisanRoute(req, res, next){
	registerArtisanValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => registerArtisanFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)

	function sendBadRequestError(error){
		throw createError(400, "BAD_REQUEST_BODY", error.errors)
	}

	function createSuccessResponse(artisan){
		console.log(artisan)
		return {
			message: "Artisan registered successfully"
		}
	}

	function sendSuccessResponse(response){
		sendSuccess(res, 200, response)
	}
}

module.exports = {
	fn: registerArtisanFn,
	route: registerArtisanRoute
}