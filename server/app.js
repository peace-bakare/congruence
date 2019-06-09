const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

// app.use("/api/v1/projects", PROJECT)

app.listen(PORT, () => {
	console.log("Application listening at port " + PORT);
})