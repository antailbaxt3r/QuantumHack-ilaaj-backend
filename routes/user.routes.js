var express = require('express');
var router = express.Router();
var users = require('../controllers/user.controller');
const middleware = require('../middleware/auth.middleware')

router.get('/get/all', middleware.tokenAuth, users.getAllUsers)
router.get('/get', middleware.tokenAuth, users.getUser)
router.post('/add', middleware.tokenAuth, users.createUser)
router.put('/update', middleware.tokenAuth, users.updateUser)
router.delete('/delete', middleware.tokenAuth, users.deleteUser)

module.exports = router