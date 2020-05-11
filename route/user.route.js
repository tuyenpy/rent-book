const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'publics/uploads/users'});
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');

//create user
router.get('/create', controller.create);
router.post('/create', upload.single('avatar'), validate.create, controller.postCreate);

//login
router.get('/login', controller.login);
router.post('/login', validate.login, controller.postLogin);

//profile
router.get('/profile', validate.auth, controller.profile);

//update profile
router.get('/profile/edit', controller.edit);
router.post('/profile/update', upload.single('avatar'), controller.update);

module.exports = router;
