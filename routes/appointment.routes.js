var express = require('express');
var router = express.Router();

var appointmentRouter = require('../controllers/appointment.controller')
var middleware = require('../middleware/auth.middleware')
var find = require('../middleware/find.middleware')
const validate = require('../middleware/validate.middleware');

router.get('/get/all', middleware.tokenAuth, appointmentRouter.getAllAppointments)
router.get('/get', middleware.tokenAuth, find.appointment, appointmentRouter.getAppointment)
router.get('/get/user', middleware.tokenAuth, appointmentRouter.filterUser)
router.post('/add', middleware.tokenAuth, validate.appointment, appointmentRouter.createAppointment)
router.put('/update', middleware.tokenAuth, find.appointment, appointmentRouter.updateAppointment)
router.delete('/delete', middleware.tokenAuth, find.appointment, appointmentRouter.deleteAppointment)

module.exports = router