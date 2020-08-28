const jwt = require("jsonwebtoken");
var config = require("../config/config");
const JWTKEY = config.keys.jwtKey;
var passport = require("passport");

// @Passport middleware sends 401 Unauthorized in case authentication fails (by default)
module.exports.tokenAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false });
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Access denied. No token found.",
        });
    }
    try {
        const auth_data = jwt.verify(token, JWTKEY);
        req.user = auth_data;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Unauthorised",
        });
    }
};
