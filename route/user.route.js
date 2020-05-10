const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'publics/uploads/users'});
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');

//create user
router.get('/create', controller.create);
router.post('/create', validate.create, upload.single('avatar'), controller.postCreate);

module.exports = router;
