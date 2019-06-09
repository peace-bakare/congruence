const express = require("express")
const employeeRouter = express.Router()

employeeRouter.get("/", (req, res) => {
	res.send("Hello and welcome")
})

module.exports = employeeRouter