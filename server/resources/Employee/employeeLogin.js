const Employee = require("./employeeModel")
const { compare } = require("bcrypt")
const { createValidator } = require("../../lib/validator")
const { createError, sendSuccess } = require("../../lib/responseHandler")

const loginEmployeeValidator = createValidator("email.string, password.string")

function loginEmployeeFn({ email, password }){

	return checkIfEmailExists()
			.then(checkForCorrectPassword)

	function checkIfEmailExists(){
		return Employee.findOne({ email: email })
				.then(handleExists)

		function handleExists(employee){
			if(!employee)
				throw createError(403, "INVALID_USERNAME_PASSWORD")
			return employee
		}
	}

	function checkForCorrectPassword(employee){
		return compare(password, employee.password)
					.then(handleCompare)

		function handleCompare(same){
			if(!same)
				throw createError(403, "INVALID_USERNAME_PASSWORD")
		}
	}

} 

function loginEmployeeRoute(req, res, next){
	loginEmployeeValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => loginEmployeeFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)


	function sendBadRequestError(error){
		throw createError(400, "BAD_REQUEST_BODY", error.errors)
	}

	function createSuccessResponse(){
		return {
			message: "Employee logged in successfully"
		}
	}

	function sendSuccessResponse(response){
		sendSuccess(res, 200, response)
	}
}

module.exports = {
	fn: loginEmployeeFn,
	route: loginEmployeeRoute
}