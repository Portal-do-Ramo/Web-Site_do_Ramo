const express = require("express");
const multer = require('multer')
const uploadConfig = require('./config/upload')

const router = express.Router();
const upload = multer(uploadConfig)

const awardController = require("./controllers/awardController");
const commonController = require("./controllers/commonController");
const crewController = require("./controllers/crewController");
const depositionController = require("./controllers/depositionController");
const newsController = require("./controllers/newsController");
const projectController = require("./controllers/projectController");
const roleController = require("./controllers/roleController");
const sponsorController = require("./controllers/sponsorController");
const userController = require("./controllers/userController");

const sendEmail = require('./services/nodemailer')

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
	.post("/deposition",depositionController.create)
	.post("/news", upload.single('img'), newsController.create)
	.post("/project",projectController.create)
	.post("/role",roleController.create)
	.post("/sponsor",sponsorController.create)
    .post("/user", userController.create)
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