const mongoose = require("mongoose");

const artisanSchema = mongoose.Schema({
	ref: { type: String },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	nickname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	craft: { type: String, required: true },
	projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
});

const artisanModel = mongoose.model("Artisan", artisanSchema);

module.exports = artisanModel;