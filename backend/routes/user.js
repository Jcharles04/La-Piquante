"use strict";

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
//const { body } = require('express-validator');
const val = require('../validators/users')

router.post("/signup",val.validateUser, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;