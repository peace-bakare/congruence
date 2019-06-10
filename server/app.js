const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const Employee = require("./resources/Employee");
const Project = require("./resources/Project");

app.use("/api/v1/employees", Employee);
app.use("/api/v1/projects", Project);

//Connect to mongodb
mongoose.connect("mongodb+srv://Wisdom:DShX5RERA6OTTG0O@cluster0-zh4ss.mongodb.net/congruence?retryWrites=true", {
        useNewUrlParser: true
})
.then(() => { console.log("Connected to online db") })
.catch(err => { console.log("Error connection to online db" , err)});


app.listen(PORT, () => {
	console.log("Application listening at port " + PORT);
})