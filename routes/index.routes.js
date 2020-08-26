var express = require('express');
var router = express.Router();

var signinRouter = require('./signin.routes')

router.use('/google', signinRouter)

module.exports = router