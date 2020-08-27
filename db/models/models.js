const db = {};

db.users = require('./user').User
db.documents = require('./document').Document
db.appointments = require('./appointment').Appointment

module.exports = db;