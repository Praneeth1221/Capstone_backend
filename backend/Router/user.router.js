const express = require('express');
const router = express.Router();
const { createUser } = require('../Controller/user.controller.js');

router.post('/createUser', createUser);

module.exports = router;
