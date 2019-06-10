const express = require("express")
const artisanRouter = express.Router()

const registerArtisan = require("./artisanRegister")
const loginArtisan = require("./artisanLogin")
const artisanSearch = require("./artisanSearch")
const getAllArtisanProjects = require("./artisanGetProjects")

artisanRouter.post("/", registerArtisan.route)
artisanRouter.post("/login", loginArtisan.route)
artisanRouter.post("/search", artisanSearch.route)

artisanRouter.get("/:artisanId/projects", getAllArtisanProjects.route)

module.exports = artisanRouter