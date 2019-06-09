const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

// app.use("/api/v1/projects", PROJECT)

//Connect to mongodb
mongoose.connect("mongodb://localhost/congruence", { useNewUrlParser: true })
            .then(() => { console.log("Connected to db") })
            .catch(err => { console.log("Error connecting to db", err) })


app.listen(PORT, () => {
	console.log("Application listening at port " + PORT);
})