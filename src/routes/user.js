const express = require('express');
const router = express.Router();
const checkIfUser = require('./../middleware/user');
const controllers = require('./../controllers/user');

router.post('/create', controllers.userCreate);

router.post('/login', controllers.userLogin);

router.get('/feed', checkIfUser(), controllers.userFeed);

module.exports = router;