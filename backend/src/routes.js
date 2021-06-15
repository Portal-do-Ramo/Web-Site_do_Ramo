const express = require('express');

const router = express.Router();

const commonController = require('./controllers/commonController.js');
const crewController = require('./controllers/crewController.js');
const userController = require('./controllers/userController.js');


router
    .get('/', commonController.index)
    .get('/crew', crewController.index)
	.get('/users', userController.index)
    .post('/users', userController.createUser)

module.exports = router;