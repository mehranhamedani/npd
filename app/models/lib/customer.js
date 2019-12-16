/* jshint indent: 1 */

export default function(sequelize, DataTypes) {
	return sequelize.define('customer', {
		customerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'customerID'
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'name'
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'address'
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
		tableName: 'customer'
	});
};
