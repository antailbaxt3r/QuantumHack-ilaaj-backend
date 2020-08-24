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

module.exports = db;
