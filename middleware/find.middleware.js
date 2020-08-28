var config = require("../config/config");
var db = require("../db/models/db");

module.exports.appointment = async (req, res, next) => {
    try {
        const id = req.body.id;
        const appointment = await db.models.appointments.findOne({
            where: { id: id },
        });
        if (appointment) {
            req.appointment = appointment;
            return next();
        } else {
            return res.status(404).json({
                success: false,
                error: "Invalid id. No appointment found.",
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
            message: e.message,
        });
    }
};

module.exports.document = async (req, res, next) => {
    try {
        const id = req.body.id;
        const appointment = await db.models.documents.findOne({
            where: { id: id },
        });
        if (appointment) {
            req.document = document;
            return next();
        } else {
            return res.status(404).json({
                success: false,
                error: "Invalid id. No document found.",
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
            message: e.message,
        });
    }
};