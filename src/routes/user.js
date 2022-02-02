const express = require('express');
const router = express.Router();
const checkIfUser = require('./../middleware/user');
const controllers = require('./../controllers/user');

router.post('/createuser', controllers.userCreate);

router.post('/login', controllers.userLogin);

router.get('/profile', checkIfUser(), controllers.userProfile);

module.exports = router;