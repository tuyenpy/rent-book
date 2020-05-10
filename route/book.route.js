const express = require('express');
const router = express.Router();
const controller = require('../controller/book.controller');

//book index
router.get('/', controller.index);
//create book
router.get('/create', controller.create);
router.post('/create', controller.postCreate);

module.exports = router;