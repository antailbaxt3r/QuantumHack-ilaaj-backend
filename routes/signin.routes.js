var express = require('express');
var router = express.Router();

var googleSignin = require("../controllers/signin.controller");

router.post('/signin', googleSignin.signIn)

module.exports = router