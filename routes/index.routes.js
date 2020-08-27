var express = require('express');
var router = express.Router();

var signinRouter = require('./signin.routes')
var userRouter = require('./user.routes')
var appointmentRouter = require('./appointment.routes')

router.use('/google', signinRouter)
router.use('/users', userRouter)
router.use('/appointments', appointmentRouter)

module.exports = router