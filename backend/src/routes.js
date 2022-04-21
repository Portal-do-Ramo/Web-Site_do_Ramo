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
const imageController = require("./controllers/imageController");
const emailController = require("./controllers/emailController");
const forgotPasswordController = require("./controllers/forgotPasswordController");

const auth = require('./middleware/auth');
const uploadImage = require("./middleware/UploadImage");
const pseMiddleware = require("./middleware/pseMiddleware")

const upload = multer(uploadImage.getConfig);

router
	.get("/awards", awardController.index)
	.get("/crews", crewController.index)
	.get("/crewsAllData", crewController.getCrewsAllData)
	.get("/projects", projectController.index)
	.get("/sponsors", sponsorController.index)
	.get("/users", userController.index)
	.get("/uploads/:name", imageController.getByName)
	.get("/pse", pseController.getSchedulePSE)
	
	
	.patch("/award/:id", awardController.update)
	.patch("/crew/:id", crewController.update)
	.patch("/project/:id", projectController.update)
	.patch("/sponsor/:id", sponsorController.update)
	.patch("/user/:id", userController.update)
	.patch("/pse/schedule", pseController.updateSchedulePSE) 

	//Fazer rota para encerrar PSE manualmente na mesma hora.

	.post("/award", auth, awardController.create)
	.post("/crew", auth, crewController.create)
	.post("/project", auth, projectController.create)
	.post("/sponsor", auth, sponsorController.create)
	.post("/user", auth, userController.create)
	.post("/login", sessionController.create)
	.post("/pse", pseMiddleware, pseController.create) 
	.post("/pse/schedule", auth, pseController.schedulePSE) 
	.post("/image/:name", auth, upload.single('picture'), imageController.uploadOne)
	.post("/email", emailController.sendCSV)
	.post("/forgot_password", forgotPasswordController.resetPassword)


	.delete("/award/:id", awardController.delete)
	.delete("/crew/:id", crewController.delete)
	.delete("/project/:id", projectController.delete)
	.delete("/sponsor/:id", sponsorController.delete)
	.delete("/pse/schedule", pseController.deleteSchedulePSE)
	.delete("/user/:id", userController.delete)

module.exports = router;