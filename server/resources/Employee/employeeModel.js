const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
	
});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;