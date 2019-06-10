const Employee = require("./employeeModel");

function registerEmployeeFn({ firstname, lastname, nickname, email, password }){
	const newEmployee = new Employee({
		firstname: firstname,
		lastname: lastname,
		nickname: nickname,
		email: email
	})
}

function registerEmployeeRoute(req, res){

}

module.exports = {
	fn: registerEmployeeFn,
	route: registerEmployeeRoute
}