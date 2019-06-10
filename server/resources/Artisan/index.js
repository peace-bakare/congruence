const express = require("express")
const artisanRouter = express.Router()

const registerArtisan = require("./artisanRegister")
const loginArtisan = require("./artisanLogin")
const artisanSearch = require("./artisanSearch")

artisanRouter.post("/", registerArtisan.route)
artisanRouter.post("/login", loginArtisan.route)
artisanRouter.post("/search", artisanSearch.route)

module.exports = artisanRouter