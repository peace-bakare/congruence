const express = require("express")
const employeeRouter = express.Router()

const registerEmployee = require("./employeeRegister")

employeeRouter.post("/", registerEmployee.route)

module.exports = employeeRouter