const express = require("express");
const multer = require("multer");

const router = express.Router();

const awardController = require("./controllers/awardController");
const crewController = require("./controllers/crewController");
const projectController = require("./controllers/projectController");
const sponsorController = require("./controllers/sponsorController");
const userController = require("./controllers/userController");
const pseController = require("./controllers/pseController");
const sessionController = require("./controllers/sessionController");
const fileController = require("./controllers/fileController");
const emailController = require("./controllers/emailController");
const forgotPasswordController = require("./controllers/forgotPasswordController");

const auth = require('./middleware/auth');
const uploadImage = require("./middleware/UploadImage");
const pseMiddleware = require("./middleware/pseMiddleware")

const upload = multer(uploadImage.getConfig);

router
	.get("/awards", awardController.index)
	.get("/crews", crewController.index)
	.get("/crew/:id", crewController.getCrewInformation)
	.get("/crewsAllData", crewController.getCrewsAllData)
	.get("/projects", projectController.index)
	.get("/sponsors", sponsorController.index)
	.get("/users", auth, userController.index)
	.get("/uploads/:name", fileController.getByName)
	.get("/pse", pseController.getSchedulePSE)
	.get("/download/check/pse.csv", auth, fileController.checkPseFile)
	.get("/download/pse.csv", auth, fileController.getPseFile)
	
	
	.patch("/award/:id", auth, awardController.update)
	.patch("/crew/:id", auth, crewController.update)
	.patch("/project/:id", auth, projectController.update)
	.patch("/sponsor/:id", auth, sponsorController.update)
	.patch("/user/:id", auth, userController.update)
	.patch("/pse/schedule", auth, pseController.updateSchedulePSE) 

	.post("/award", auth, awardController.create)
	.post("/crew", auth, crewController.create)
	.post("/project", auth, projectController.create)
	.post("/sponsor", auth, sponsorController.create)
	.post("/user", auth, userController.create)
	.post("/login", sessionController.create)
	.post("/pse", pseMiddleware, pseController.create) 
	.post("/pse/schedule", auth, pseController.schedulePSE) 
	.post("/image/:name", auth, upload.single('picture'), fileController.uploadOne)
	.post("/email", emailController.sendCSV)
	.post("/forgot_password", forgotPasswordController.resetPassword)


	.delete("/award/:id", auth, awardController.delete)
	.delete("/crew/:id", auth, crewController.delete)
	.delete("/project/:id", auth, projectController.delete)
	.delete("/sponsor/:id", auth, sponsorController.delete)
	.delete("/pse/schedule", auth, pseController.deleteSchedulePSE)
	.delete("/user/:id", auth, userController.delete)

module.exports = router;