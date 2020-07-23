let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Animal = sequelize.import('../models/animal');

module.exports = router;