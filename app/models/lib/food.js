/* jshint indent: 1 */

export default function(sequelize, DataTypes) {
	return sequelize.define('food', {
		foodID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'foodID'
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'name'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'description'
		},
		foodTypeID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'foodTypeID'
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updatedAt'
		}
	}, {
		tableName: 'food'
	});
};
