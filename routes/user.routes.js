var express = require('express');
var router = express.Router();
var users = require('../controllers/user.controller');
const middleware = require('../middleware/auth.middleware')

router.get('/get/all', middleware.tokenAuth, users.getAllUsers)
router.get('/get', middleware.tokenAuth, users.getUser)
router.get('/get/college', middleware.tokenAuth, users.filterCollege)
router.get('/get/doctors', middleware.tokenAuth, users.doctorData)
router.get('/get/direct', middleware.tokenAuth, users.userData)
router.post('/add', middleware.tokenAuth, users.createUser)
router.put('/update', middleware.tokenAuth, users.updateUser)
router.delete('/delete', middleware.tokenAuth, users.deleteUser)

module.exports = router