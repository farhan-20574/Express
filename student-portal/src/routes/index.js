const express = require('express');
const IndexController = require('../controllers/index');

const router = express.Router();
const indexController = new IndexController();

router.get('/', indexController.home.bind(indexController));

module.exports = router;