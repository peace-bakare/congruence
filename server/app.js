const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 8080;


const Employee = require("./resources/Employee");

app.use("/api/v1/employees", Employee);

//Connect to mongodb
mongoose.connect("mongodb://localhost/congruence", { useNewUrlParser: true })
            .then(() => { console.log("Connected to db") })
            .catch(err => { console.log("Error connecting to db", err) })


app.listen(PORT, () => {
	console.log("Application listening at port " + PORT);
})