const Employee = require("./employeeModel")
const { hash } = require("bcrypt")
const { createValidator } = require("../../lib/validator")
const { createError, sendSuccess } = require("../../lib/responseHandler")

const registerEmployeeValidator = createValidator("firstname.string, lastname.string, nickname.string, email.string, password.string, craft.string")

function registerEmployeeFn({ firstname, lastname, nickname, email, password, craft }){

	return checkIfEmailExists()
			.then(checkIfNicknameExists)
			.then(() => hash(password, 11))
			.then(createEmployee)
			.then(saveEmployee)

	function checkIfNicknameExists(){
		return Employee.findOne({ nickname: nickname })
				.then(handleExists)

		function handleExists(employee){
			if(employee)
				throw createError(403, "NICK_NAME_EXISTS")
		}
	}

	function checkIfEmailExists(){
		return Employee.findOne({ email: email })
				.then(handleExists)

		function handleExists(employee){
			if(employee)
				throw createError(403, "EMAIL_EXISTS")
		}
	}

	function createEmployee(hashedPassword){
		const newEmployee = new Employee({
			firstname: firstname,
			lastname: lastname,
			nickname: nickname,
			email: email,
			password: hashedPassword,
			craft: craft
		})

		return newEmployee
	}

	function saveEmployee(employee){
		return employee.save()
	}

}

function registerEmployeeRoute(req, res, next){
	registerEmployeeValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => registerEmployeeFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)

	function sendBadRequestError(error){
		throw createError(400, "BAD_REQUEST_BODY", error.errors)
	}

	function createSuccessResponse(){
		return {
			message: "Employee registered successfully"
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