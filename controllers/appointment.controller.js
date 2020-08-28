var config = require("../config/config");
var db = require("../db/models/db");

module.exports.getAllAppointments = async (req, res) => {
	try {
		const appointments = await db.models.appointments.findAll();
		res.status(200).json({
			success: true,
			appointments: appointments,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
};

module.exports.getAppointment = async (req, res) => {
	try {
		
			res.status(200).json({
				success: true,
				appointment: req.appointment,
			});
		
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			error: "Internal server error",
			details: e.message,
		});
	}
};

module.exports.createAppointment = async (req, res) => {
	try {
		const newAppointment = {
			user_id: req.body.user_id,
            doctor_id: req.body.doctor_id,
            dateTime: req.body.dateTime,
            meet_link: req.body.meet_link, 
            payment_complete: req.body.payment_complete,
		};
		const appointment = await db.models.appointments.create(newAppointment);
		res.status(200).json({
			success: true,
			message: "Appointment created successfully!",
			appointment: appointment,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
};

module.exports.deleteAppointment = async (req, res) => {
	try {
		const appointment = await db.models.appointments.findOne({
			where: {
				id: req.appointment.id,
			},
		});
		if (appointment) {
			await db.models.appointments.destroy({
				where: {
					id: appointment.id,
				},
			});
			res.status(200).json({
				success: true,
				message: "Appointment deleted successfully!",
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Appointment not found",
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
};

module.exports.updateAppointment = async (req, res) => {
	try {
		const appointment = await db.models.appointments.findOne({
			where: {
				id: req.appointment.id,
			},
		});
		const updates = {
			user_id: req.body.user_id,
            doctor_id: req.body.doctor_id,
            dateTime: req.body.dateTime,
            meet_link: req.body.meet_link, 
            payment_complete: req.body.payment_complete,
		};
		if (appointment) {
			await db.models.appointments.update(updates, { where: { id: appointment.id } });
			res.status(200).json({
				success: true,
				message: "Appointment updated successfully!",
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Appointment not found",
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			details: e.message,
		});
	}
};

module.exports.filterUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const appointments = await db.models.appointments.findAll({
            where: {
                user_id: userId,
            }
        })
        res.status(200).json({
            success: true,
            appointments: appointments
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            details: e.message
        })
    }
}