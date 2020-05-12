const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'publics/upload/books'});
const controller = require('../controller/book.controller');
const validate = require('../validate/book.validate');


//book index
router.get('/', controller.index);
//create book
router.get('/create', controller.create);
router.post('/create', upload.single('image'), validate.create, controller.postCreate);

module.exports = router;