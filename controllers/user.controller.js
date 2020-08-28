var config = require("../config/config");
var db = require("../db/models/db");

module.exports.getAllUsers = async (req, res) => {
	try {
		const users = await db.models.users.findAll({
			include: [
				{
					model: db.models.documents,
					as: "documents",
					attributes: { exclude: ["createdAt", "updatedAt", "userId",] },
                },
            ]
		});
		res.status(200).json({
			success: true,
			users: users,
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

module.exports.getUser = async (req, res) => {
	try {
		const user = await db.models.users.findOne({
			where: { id: req.user.id },
			include: [
				{
					model: db.models.documents,
					as: "documents",
					attributes: { exclude: ["createdAt", "updatedAt", "userId",] },
                },
            ]
		});
		if (user) {
			res.status(200).json({
				success: true,
				user: user,
			});
		} else {
			res.status(404).json({
				success: false,
				message: "User not found",
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

module.exports.createUser = async (req, res) => {
	try {
		const newUser = {
			name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone, 
            doctor: req.body.doctor,
		};
		const user = await db.models.users.create(newUser);
		res.status(200).json({
			success: true,
			message: "User created successfully!",
			user: user,
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

module.exports.deleteUser = async (req, res) => {
	try {
		const user = await db.models.users.findOne({
			where: {
				id: req.user.id,
			},
		});
		if (user) {
			await db.models.users.destroy({
				where: {
					id: user.id,
				},
			});
			res.status(200).json({
				success: true,
				message: "User deleted successfully!",
			});
		} else {
			res.status(404).json({
				success: false,
				message: "User not found",
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

module.exports.updateUser = async (req, res) => {
	try {
		const user = await db.models.users.findOne({
			where: {
				id: req.user.id,
			},
		});
		const updates = {
			name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone, 
			doctor: req.body.doctor,
			new_user: req.body.new_user,
		};
		if (user) {
			await db.models.users.update(updates, { where: { id: user.id } });
			res.status(200).json({
				success: true,
				message: "User updated successfully!",
			});
		} else {
			res.status(404).json({
				success: false,
				message: "User not found",
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

module.exports.filterCollege = async (req, res) => {
    try {
        const collegeId = req.body.collegeId;
        const users = await db.models.users.findAll({
            where: {
                collegeId: collegeId
            }
        })
        res.status(200).json({
            success: true,
            users: users
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