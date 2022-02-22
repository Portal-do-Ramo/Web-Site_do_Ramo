const express = require("express");

const router = express.Router();

const awardController = require("./controllers/awardController");
const crewController = require("./controllers/crewController");
const projectController = require("./controllers/projectController");
const roleController = require("./controllers/roleController");
const sponsorController = require("./controllers/sponsorController");
const userController = require("./controllers/userController");
const pseController = require("./controllers/pseController");

const sendEmail = require('./services/nodemailer');

const auth = require('./middleware/auth');

router
	.get("/awards", awardController.index)
	.get("/crews", crewController.index)
	.get("/projects", projectController.index)
	.get("/roles", roleController.index)
	.get("/sponsors", sponsorController.index)
	.get("/users", userController.index)


	.get("/award/:id", awardController.show)
	.get("/crew/:id", crewController.show)
	.get("/project/:id", projectController.show)
	
	
	.patch("/award", awardController.update)
	.patch("/crew", crewController.update)
	.patch("/project", projectController.update)
	.patch("/role", roleController.update)
	.patch("/sponsor", sponsorController.update)
	.patch("/user", userController.update)

	
	.post("/award", awardController.create)
	.post("/crew", crewController.create)
	.post("/project", auth, projectController.create)
	.post("/role",roleController.create)
	.post("/sponsor",sponsorController.create)
	.post("/user", userController.create)
	.post("/login", userController.login)
	.post("/pse", pseController.create)


	.delete("/award", awardController.delete)
	.delete("/crew", crewController.delete)
	.delete("/project", projectController.delete)
	.delete("/role", roleController.delete)
	.delete("/sponsor", sponsorController.delete)
	.delete("/user", userController.delete)

module.exports = router;