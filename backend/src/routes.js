const express = require("express");

const router = express.Router();

const commonController = require("./controllers/commonController");
const crewController = require("./controllers/crewController");
const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");
const awardController = require("./controllers/awardController");
const depositionController = require("./controllers/depositionController");
const newsController = require("./controllers/newsController")
const sponsorsController = require("./controllers/sponsorController")

router
    .get("/", commonController.index)
	.get("/users", userController.index)
    .get("/crews", crewController.index)
	.get("/projects", projectController.index)
    .get("/awards", awardController.index)
    .get("/award/:id", awardController.show)
	.get("/news", newsController.index)
	.get("/sponsors", sponsorsController.index)
	.get("/deposition", depositionController.index)
    .patch("/deposition/:deposition", depositionController.update)
    .post("/user", userController.create)
	.post("/project", projectController.create)
    .post("/award", awardController.create)
	.post("/news", newsController.create)
	.post("/sponsor", sponsorsController.create)
	.post("/deposition", depositionController.create)
	.delete("/crew", crewController.delete)
    .delete("/project", projectController.delete)
    .delete("/award", awardController.delete)
	.delete("/news", newsController.delete)
	.delete("/sponsors", sponsorsController.delete)

module.exports = router;