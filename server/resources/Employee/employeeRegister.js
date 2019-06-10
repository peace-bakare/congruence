const Employee = require("./employeeModel")
const { createValidator } = require("../../lib/validator")
const { sendError } = require("../../lib/responseHandler")

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

	function sendBadRequestError(errors){
		sendError(res, 400, errors.errors)
	}
}

module.exports = {
	fn: registerEmployeeFn,
	route: registerEmployeeRoute
}