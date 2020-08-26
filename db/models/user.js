const db = require("../db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.User = sequelize.define(
	"users",
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
        age: {
            type: DataTypes.BIGINT
        },
        phone: {
            type: DataTypes.STRING
        },
        new_user: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
        }
	},
	{
		underscored: true,
	}
);