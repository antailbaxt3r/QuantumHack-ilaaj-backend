var express = require('express');
var router = express.Router();

var documentRouter = require('../controllers/document.controller')
var middleware = require('../middleware/auth.middleware')
var find = require('../middleware/find.middleware')
const validate = require('../middleware/validate.middleware');

router.get('/get', middleware.tokenAuth, find.document, documentRouter.getDoc)
router.get('/get/user/records', middleware.tokenAuth, documentRouter.getUserDocuments)
router.get('/get/doctor/prescriptions', middleware.tokenAuth, documentRouter.getDoctorPrescriptions)

module.exports = router