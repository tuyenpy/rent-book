const express = require('express');
const router = express.Router();
const controller = require('../controller/cart.controller');

//View all books in cart
router.get('/', controller.index);

//Delete all books in the cart
router.get('/reset', controller.reset);

module.exports = router;