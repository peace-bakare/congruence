const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;


const Employee = require("./resources/Employee");

app.use("/api/v1/employees", Employee);

app.listen(PORT, () => {
	console.log("Application listening at port " + PORT);
})