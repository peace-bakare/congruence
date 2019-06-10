const Employee = require("./employeeModel")
const { createValidator } = require("../../lib/validator")
const { sendError, sendSuccess } = require("../../lib/responseHandler")

const registerEmployeeValidator = createValidator("firstname.string, lastname.string, nickname.string, email.string, password.string")

function registerEmployeeFn({ firstname, lastname, nickname, email, password }){
	const newEmployee = new Employee({
		firstname: firstname,
		lastname: lastname,
		nickname: nickname,
		email: email
	})

	return newEmployee.save()
}

function registerEmployeeRoute(req, res){
	registerEmployeeValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => registerEmployeeFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)

	function sendBadRequestError(errors){
		sendError(res, 400, errors.errors)
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