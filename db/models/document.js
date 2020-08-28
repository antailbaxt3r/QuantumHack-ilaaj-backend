const db = require("../db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Document = sequelize.define(
	"documents",
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
		record_id: {
            type: DataTypes.BIGINT
        }
	},
	{
		underscored: true,
	}
);