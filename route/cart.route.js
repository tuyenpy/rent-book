const express = require('express');
const router = express.Router();
const controller = require('../controller/cart.controller');

//View all books in cart
router.get('/', controller.index);


module.exports = router;