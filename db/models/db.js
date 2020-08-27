const Sequelize = require("sequelize");

const db = {};

// The cache configuration
var Redis = require("ioredis");
db.cache = Redis;

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.sequelize = require("../db");
db.models = require("./models");

//relations

//Users-Documents
db.models.users.hasMany(db.models.documents, { as: 'documents' })
db.models.documents.belongsTo(db.models.users, { foreignKey: 'userId', as: 'user' })

module.exports = db;
