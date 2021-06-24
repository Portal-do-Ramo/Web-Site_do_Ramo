const express = require("express");

const router = express.Router();

const commonController = require("./controllers/commonController");
const crewController = require("./controllers/crewController");
const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");
const awardController = require("./controllers/awardController");
const depositionController = require("./controllers/depositionController");
const newsController = require("./controllers/newsController")
const sponsorController = require("./controllers/sponsorController")

router
    .get("/", commonController.index)
    .get("/awards", awardController.index)
    .get("/crews", crewController.index)
	.get("/depositions", depositionController.index)
	.get("/news", newsController.index)
	.get("/projects", projectController.index)
	.get("/sponsors", sponsorsController.index)
	.get("/users", userController.index)
    .get("/award/:id", awardController.show)
	.get("/crew/:id", crewController.show)
    .get("/news/:id", newsController.show)
    .get("/project/:id", projectController.show)
	.patch("/award", awardController.update)
	.patch("/crew", crewController.update)
    .patch("/deposition", depositionController.update)
	.patch("/news", newsController.update)
	.patch("/project", project.update)
	.patch("/sponsor", sponsorController.update)
	.patch("/user", userController.update)
    .post("/award", awardController.create)
	.post("/crew", crewController.create)
	.post("/deposition", depositionController.create)
	.post("/news", newsController.create)
	.post("/project", projectController.create)
	.post("/sponsor", sponsorsController.create)
    .post("/user", userController.create)
    .delete("/award", awardController.delete)
	.delete("/crew", crewController.delete)
	.delete("/deposition", depositionController.delete)
	.delete("/news", newsController.delete)
    .delete("/project", projectController.delete)
	.delete("/sponsor", sponsorsController.delete)
	.delete("/user", userController.delete)

module.exports = router;