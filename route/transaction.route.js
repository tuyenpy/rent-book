const express = require('express');
const router = express.Router();
const controller = require('../controller/transaction.controller');

//index
router.get('/', controller.index);

//create transaction
router.get('/create', controller.create);


module.exports = router;