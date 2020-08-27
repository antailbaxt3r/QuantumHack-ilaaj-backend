var express = require('express');
var router = express.Router();

var signinRouter = require('./signin.routes')
var userRouter = require('./user.routes')

router.use('/google', signinRouter)
router.use('/users', userRouter)

module.exports = router