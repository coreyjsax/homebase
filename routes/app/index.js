const express = require('express');
const router = express.Router();

//require controllers
const app_index_controller = require('../../controllers/nav/index')

router.get('/', app_index_controller.get_index_route)

module.exports = router;