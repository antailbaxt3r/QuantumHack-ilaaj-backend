const db = {};

db.users = require('./user').User
db.documents = require('./document').Document

module.exports = db;