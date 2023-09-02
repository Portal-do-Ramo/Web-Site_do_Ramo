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
const sheetController = require("./controllers/sheetController");

const auth = require('./middleware/auth');
const admin = require('./middleware/admin');
const uploadImage = require("./middleware/UploadImage");
const pseMiddleware = require("./middleware/pseMiddleware");

const upload = multer(uploadImage.getConfig);

router
	.get("/awards", awardController.index)
	.get("/award/:id", awardController.getAward)
	.get("/awards/crew/:crewId", awardController.getByCrewId)
	.get("/crews", crewController.index)
	.get("/crew/:id", crewController.getCrew)
	.get("/crewsAllData", crewController.getCrewsAllData)
	.get("/projects", projectController.index)
	.get("/projects/crew/:crewId", projectController.getByCrewId)
	.get("/project/:id", projectController.getProject)
	.get("/sponsors", sponsorController.index)
	.get("/users", auth, admin, userController.index)
	.get("/uploads/:name", fileController.getByName)
	.get("/pse", pseController.getSchedulePSE)

	
	.patch("/award/:id", auth, awardController.update)
	.patch("/crew/:id", auth, crewController.update)
	.patch("/project/:id", auth, projectController.update)
	.patch("/sponsor/:id", auth, sponsorController.update)
	.patch("/user/:id", auth, admin, userController.update)
	.patch("/pse/schedule", auth, admin, pseController.updateSchedulePSE) 


	.post("/award", auth, awardController.create)
	.post("/crew", auth, admin, crewController.create)
	.post("/project", auth, projectController.create)
	.post("/sponsor", auth, sponsorController.create)
	.post("/user", auth, admin, userController.create)
	.post("/login", sessionController.create)
	.post("/pse", pseMiddleware, pseController.create) 
	.post("/pse/schedule", auth, admin, pseController.schedulePSE) 
	.post("/image/:name", auth, upload.single('picture'), fileController.uploadOne)


	.delete("/award/:id", auth, awardController.delete)
	.delete("/crew/:id", auth, admin, crewController.delete)
	.delete("/project/:id", auth, projectController.delete)
	.delete("/sponsor/:id", auth, sponsorController.delete)
	.delete("/pse/schedule", auth, admin, pseController.deleteSchedulePSE)
	.delete("/user/:id", auth, admin, userController.delete)
	.delete("/sheet", sheetController.delete)
	.delete("/pse/subscribers", pseController.deleteSubscribersData)
	.delete("/sheet", pseMiddleware, sheetController.delete)

	

module.exports = router;