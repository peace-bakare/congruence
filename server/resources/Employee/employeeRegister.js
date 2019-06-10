const Employee = require("./employeeModel")
const { createValidator } = require("../../lib/validator")
const { createError, sendSuccess } = require("../../lib/responseHandler")

const registerEmployeeValidator = createValidator("firstname.string, lastname.string, nickname.string, email.string, password.string")

function registerEmployeeFn({ firstname, lastname, nickname, email, password }){
	const newEmployee = new Employee({
		firstname: firstname,
		lastname: lastname,
		nickname: nickname,
		email: email,
		password: password
	})

	return newEmployee.save()
}

function registerEmployeeRoute(req, res, next){
	registerEmployeeValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => registerEmployeeFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)

	function sendBadRequestError(errors){
		throw createError(400, "BAD_REQUEST_BODY", errors.errors)
	}

	function createSuccessResponse(){
		return {
			message: "User registered successfully"
		}
	}

	function sendSuccessResponse(response){
		sendSuccess(res, 200, response)
	}
}

module.exports = {
	fn: registerEmployeeFn,
	route: registerEmployeeRoute
}