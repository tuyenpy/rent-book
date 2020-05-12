const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'publics/uploads/books'});
const controller = require('../controller/book.controller');
const validate = require('../validate/book.validate');
const Book = require('../model/book.model');


//book index
router.get('/', controller.index);
//create book
router.get('/create', controller.create);
router.post('/create', upload.single('image'), validate.create, controller.postCreate);

//delete all book
router.get('/delete', (req, res) => {
    Book.deleteMany()
     .then(res => console.log('deleted'))
     .catch(err => console.log(err));
})

module.exports = router;