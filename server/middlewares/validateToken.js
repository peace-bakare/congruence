//Validates the user token
const { createError } = require("../lib/responseHandler")
const { SECRET_KEY } = require("../config")
const { promisify } = require("util");

//Add promise functionality to token validator
let { verify } = require("jsonwebtoken")
verify = promisify(verify);

let validateToken = (req, res, next) => {

	if(!req.body.token) next(createError(400, "TOKEN_NOT_FOUND"))

	verify(req.body.token, SECRET_KEY)
		.then(attachUserInfo) //Attaches the user info to the req.body object
		.then(next)
		.catch(handleErrors)

	function attachUserInfo(decodedToken){
		let user = decodedToken
		req.body.user = user
	}

	function handleErrors(error){
		if(error.statusCode)
			next(error)
		else if(error.name == "TokenExpiredError")
			next(createError(403, "TOKEN_EXPIRED"))
		else if(error.name == "JsonWebTokenError")
			next(createError(403, "TOKEN_INVALID"))
		else
			next(createError(400, "COULD_NOT_VALIDATE_TOKEN"))
	}

}

module.exports = validateToken