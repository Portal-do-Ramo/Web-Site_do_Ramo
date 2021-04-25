const express = require('express');

const commonController = require('./controllers/commonController');
const userController = require('./controllers/userController');

const router = express.Router();


router.get("/", commonController.index)
    .post("/", userController.createUser);

module.exports = router;