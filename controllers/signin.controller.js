var admin = require("firebase-admin");
var { OAuth2Client } = require("google-auth-library");
var jwt = require("jsonwebtoken");

var config = require("../config/config");
var db = require("../db/models/db");

var firebaseConfig = require("../config/config").firebaseConfig;

admin.initializeApp(firebaseConfig);

module.exports.signIn = async (req, res) => {
    const CLIENT_ID = config.google.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const idToken = req.body.idToken;
    if (idToken) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            // get the data from google
            const payload = ticket.getPayload();
            // const userid = payload['sub'];
            // If request specified a G Suite domain:
            //const domain = payload['hd'];
            const userEmail = payload["email"];
            const userName = payload["name"];
            // check if the user already exists in our database
            let user = await db.models.users.findOne({
                where: {
                    email: userEmail,
                },
            });
            // console.log(user);
            if (!user) {
                // Create a new user
                var create_object = {
                    email: userEmail,
                    name: userName,
                    doctor: req.body.doctor,
                };

                db.models.users
                    .create(create_object)
                    .then((login_data) => {
                        // The payload of the auth-token
                        console.log("LOGIN DATA: ", login_data);
                        var auth_data = {
                            email: login_data.email,
                            id: login_data.id,
                            created_at: login_data.created_at,
                        };
                        // Create and assign an auth-token
                        const TOKEN_SECRET = config.keys.jwtKey;
                        var token = jwt.sign(auth_data, TOKEN_SECRET);
                        return res.status(200).json({
                            success: true,
                            authToken: token,
                            newUser: login_data.new_user, // newUser = true
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "Internal server error",
                            details: err,
                        });
                    });
            } else {
                // The user has already signed-in through google
                // The payload of the auth-token
                var auth_data = {
                    email: user.email,
                    id: user.id,
                    created_at: user.created_at,
                    doctor: user.doctor,
                };
                // Create and assign an auth-token
                const TOKEN_SECRET = config.keys.jwtKey;
                var token = jwt.sign(auth_data, TOKEN_SECRET);
                console.log(user);
                return res.status(200).json({
                    success: true,
                    authToken: token,
                    newUser: user.new_user,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error.",
                details: err,
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            error: "Idtoken not found.",
        });
    }
};
