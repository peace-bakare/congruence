const express = require("express")
const employeeRouter = express.Router()

const registerEmployee = require("./employeeRegister")
const loginEmployee = require("./employeeLogin")

employeeRouter.post("/", registerEmployee.route)
employeeRouter.post("/login", loginEmployee.route)

module.exports = employeeRouter