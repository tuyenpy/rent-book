const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');

//create user
router.post('/create', controller.postCreate);

//profile
router.get('/profile', validate.auth, controller.profile);


module.exports = router;
