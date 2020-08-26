const jwt = require("jsonwebtoken");
var config = require("../config/config");
const JWTKEY = config.keys.jwtKey;
var passport = require("passport");

// @Passport middleware sends 401 Unauthorized in case authentication fails (by default)
module.exports.tokenAuth = passport.authenticate("jwt", { session: false });
