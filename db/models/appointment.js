const db = require("../db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Appointment = sequelize.define(
	"appointments",
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.BIGINT
		},
		doctor_id: {
			type: DataTypes.BIGINT
		},
        dateTime: {
            type: DataTypes.DATE
        },
        payment_complete: {
            type: DataTypes.BOOLEAN,
            default: false
        },
		meet_link: {
			type: DataTypes.STRING
		}
	},
	{
		underscored: true,
	}
);