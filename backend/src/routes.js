const express = require('express');

const commonController = require('../controllers/commonController');

const router = express.Router();


router.get(commonController.index);

module.exports = router;