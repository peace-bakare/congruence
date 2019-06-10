const Employee = require("./employeeModel")
const { createError, sendSuccess } = require("../../lib/responseHandler")
const { createValidator } = require("../../lib/validator")

const searchEmployeeValidator = createValidator("craft.string")

function searchEmployeeFn({ craft }){
	return Employee.find({ craft: craft })
				.then(filterEmployee)

	function filterEmployee(employees){
		return employees.map(employee => {
			let modifiedEmployee = {
				firstname: employee.firstname,
				lastname: employee.lastname,
				nickname: employee.nickname,
				craft: employee.craft
			}

			return modifiedEmployee
		})
	}
}

function searchEmployeeRoute(req, res, next){
	
	searchEmployeeValidator(req.body)
		.catch(sendBadRequestError)
		.then(() => searchEmployeeFn(req.body))
		.then(createSuccessResponse)
		.then(sendSuccessResponse)
		.catch(next)

	function sendBadRequestError(errors){
		throw createError(403, "BAD_REQUEST_BODY", errors.errors)
	}

	function createSuccessResponse(employees){
		return {
			employees: employees
		}
	}

	function sendSuccessResponse(response){
		sendSuccess(res, 200, response)
	}

}

module.exports = {
	fn: searchEmployeeFn,
	route: searchEmployeeRoute
}