const express = require('express');
const router = express.Router();
const controller = require('../controller/document.controller');

router.get('/api', controller.api);

module.exports = router;