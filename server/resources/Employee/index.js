const express = require("express")
const employeeRouter = express.Router()

const registerEmployee = require("./employeeRegister")
const loginEmployee = require("./employeeLogin")
const employeeSearch = require("./employeeSearch")

employeeRouter.post("/", registerEmployee.route)
employeeRouter.post("/login", loginEmployee.route)
employeeRouter.post("/search", employeeSearch.route)

module.exports = employeeRouter