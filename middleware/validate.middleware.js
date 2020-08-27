const Joi = require('joi');

// Complaints Validation
module.exports.document = (req, res, next) => {
    const doc = req.body;
    const schema = Joi.object();
    const { data, error } = schema.validate(doc);
    if (error) {
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request',
            message: error
        });
    } else {
        console.log(data);
        return next();
    }
}

module.exports.appointment = (req, res, next) => {
    const appointment =req.body;
    const schema = Joi.object({
        user_id: Joi.number().required(),
        doctor_id: Joi.number().required(),
        dateTime: Joi.date().required()
    });
    const { data, error } = schema.validate(appointment)
    if (error) {
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request',
            message: error
        });
    } else {
        console.log(data);
        return next();
    }
}