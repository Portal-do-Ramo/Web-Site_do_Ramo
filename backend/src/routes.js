const express = require("express");

const router = express.Router();

const commonController = require("./controllers/commonController");
const crewController = require("./controllers/crewController");
const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");
const awardController = require("./controllers/awardController");
const depositionController = require("./controllers/depositionController");
const newsController = require("./controllers/newsController");
const sponsorController = require("./controllers/sponsorController");
const roleController = require("./controllers/roleController");

const auth = require('./middleware/auth')

router
    .get("/", commonController.index)
    .get("/awards", awardController.index)
    .get("/crews", crewController.index)
	.get("/depositions", depositionController.index)
	.get("/news", newsController.index)
	.get("/projects", projectController.index)
	.get("/roles", roleController.index)
	.get("/sponsors", sponsorController.index)
	.get("/users", userController.index)


    .get("/award/:id", awardController.show)
	.get("/crew/:id", crewController.show)
    .get("/news/:id", newsController.show)
    .get("/project/:id", projectController.show)
	
	
	.patch("/award", awardController.update)
	.patch("/crew", crewController.update)
    .patch("/deposition", depositionController.update)
	.patch("/news", newsController.update)
	.patch("/project", projectController.update)
	.patch("/role", roleController.update)
	.patch("/sponsor", sponsorController.update)
	.patch("/user", userController.update)

	
    .post("/award", awardController.create)
	.post("/crew", crewController.create)
	.post("/deposition", auth,depositionController.create)
	.post("/news", auth,newsController.create)
	.post("/project", auth,projectController.create)
	.post("/role", auth,roleController.create)
	.post("/sponsor", auth,sponsorController.create)
    .post("/user", auth, userController.create)
	.post("/login", userController.login)


    .delete("/award", awardController.delete)
	.delete("/crew", crewController.delete)
	.delete("/deposition", depositionController.delete)
	.delete("/news", newsController.delete)
    .delete("/project", projectController.delete)
	.delete("/role", roleController.delete)
	.delete("/sponsor", sponsorController.delete)
	.delete("/user", userController.delete)


module.exports = router;