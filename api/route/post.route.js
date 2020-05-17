const express = require('express');
const router = express.Router();
const controller = require('../controller/post.controller');

//get all post
router.get('/', controller.index);

module.exports = router;