const express = require("express");

const router = express.Router();

const commonController = require("./controllers/commonController.js");
const crewController = require("./controllers/crewController.js");
const userController = require("./controllers/userController.js");
const projectController = require("./controllers/projectController.js");
const awardController = require("./controllers/awardController")

router
    .get("/", commonController.index)
    .get("/crews", crewController.index)
	.get("/users", userController.index)
	.get("/projects", projectController.index)
    .get("/awards", awardController.index)
    .get("/award/:id", awardController.show)
    .post("/users", userController.createUser)
	.post("/project", projectController.create)
    .post("/award", awardController.create)
	.delete("/crew", crewController.delete)
    .delete("/project", projectController.delete)
    .delete("/award", awardController.delete)

module.exports = router;