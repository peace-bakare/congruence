const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	nickname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
	//TODO Add projects
});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;