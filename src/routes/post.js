const express = require('express');
const { getPosts, createPost } = require('./../controllers/post');
const checkIfUser = require('./../middleware/user');
const router = express.Router();

router.get('/feed', checkIfUser() , getPosts);

router.post('/createpost', checkIfUser(), createPost);

module.exports = router;